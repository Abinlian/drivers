# encoding:utf-8
# coding:utf-8
__author__ = 'Abinlian'

import urllib
import urllib2
import socket
import re
import random

import gen_sql

# 设置代理，启用debuglog，设置headers和data
def crawl_init(enable_proxy = True, enable_debug = True):
    # 设置socket超时
    socket.setdefaulttimeout(15)

    # 启用debug log
    if enable_debug:
        http_handler = urllib2.HTTPHandler(debuglevel=1)
        https_handler = urllib2.HTTPSHandler(debuglevel=1)
        opener = urllib2.build_opener(http_handler, https_handler)
        urllib2.install_opener(opener)

    # 设置代理，防止访问次数过多被禁止
    proxy_handler = urllib2.ProxyHandler({"http" : 'http://127.0.0.1:9743'})
    null_proxy_handler = urllib2.ProxyHandler({})
    if enable_proxy:
        opener = urllib2.build_opener(proxy_handler)
    else:
        opener = urllib2.build_opener(null_proxy_handler)
    urllib2.install_opener(opener)

    # 设置访问的headers
    headers = {}
    # headers['Host'] = 'www.meituan.com'
    # headers['Connection'] = ''
    headers['X-Requested-With'] = ''
    headers['User-Agent'] = [
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
        'Mozilla/5.0 (Windows; U; Windows NT 5.1; it; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
        'Opera/9.25 (Windows NT 5.1; U; en)',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
        'Mozilla/5.0 (compatible; Konqueror/3.5; Linux) KHTML/3.5.5 (like Gecko) (Kubuntu)',
        'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
        'Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
        "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.7 (KHTML, like Gecko) Ubuntu/11.04 Chromium/16.0.912.77 Chrome/16.0.912.77 Safari/535.7",
        "Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:10.0) Gecko/20100101 Firefox/10.0 ",
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        ]
    headers['Accept'] = "*/*"
    # headers['Referer'] = ''
    # headers['Cookie'] = ''

    # 设置访问的data
    values = {}
    data = urllib.urlencode(values)

    return data, headers

# 返回爬取到的页面html
# 异常是返回 <None>
def crawl(url, data, headers):
    try:
        if data == '':
            request = urllib2.Request(url, headers=headers)
        else:
            request = urllib2.Request(url, data, headers)
        response = urllib2.urlopen(request, timeout=10)
    except urllib2.HTTPError, e:
        if hasattr(e, "code"):
            print e.code
        if hasattr(e, "reason"):
            print e.reason
        return 'None'
    except urllib2.URLError, e:
        if hasattr(e, "code"):
            print e.code
        if hasattr(e, "reason"):
            print e.reason
        return 'None'
    else:
        return response.read()

# movie_list为元组列表
# 元组第一个元素为cinema_url，第二个为movie_id
# 返回字典列表，每个字典为一个sql记录
def crawl_and_extrat(movie_list, data, headers):
    location_dict = {}
    cinema_dict = {}
    room_dict = {}
    show_dict = {}

    seat_list = []

    for movie in movie_list:
        cinema_url = movie[0]
        movie_id = movie[1]

        print '====movie_id: ' + str(movie_id) + " url: " + cinema_url + " start"

        # cinema page
        headers['X-Requested-With'] = ''
        cinema_html_raw = crawl(cinema_url, data, headers)
        if cinema_html_raw != 'None':
            cinema_info_list = extract_cinema_info(cinema_html_raw)
            for location_name, cinema_name, cinema_rating, cinema_address, show_url in cinema_info_list:
                # add to location list
                if not location_dict.has_key(location_name):
                    location_id = len(location_dict) + 1
                    location = {}
                    location['id'] = location_id
                    location['name'] = location_name
                    location_dict[location_name] = location
                else:
                    location_id = location_dict[location_name]['id']

                # add to cinema list
                if not cinema_dict.has_key(cinema_name):
                    cinema_id = len(cinema_dict) + 1
                    cinema = {}
                    cinema['id'] = cinema_id
                    cinema['location_id'] = location_id
                    cinema['name'] = cinema_name
                    cinema['rating'] = cinema_rating
                    cinema['address'] = cinema_address
                    cinema_dict[cinema_name] = cinema
                else:
                    cinema_id = cinema_dict[cinema_name]['id']

                print "----cinema_id: " + str(cinema_id) + " cienma name: " + cinema_name + " show_url: " + show_url +" ok"

                # show page
                headers['X-Requested-With'] = 'XMLHttpRequest'
                show_html_raw = crawl(show_url, data, headers)
                if show_html_raw != 'None':
                    show_info_list = extract_show_info(show_html_raw)
                    for room_name, show_time, show_language, show_price in show_info_list:
                        # add to room list
                        if not room_dict.has_key(str(cinema_id)+room_name):
                            room_id = len(room_dict) + 1
                            room = {}
                            room['id'] = room_id
                            room['cinema_id'] = cinema_id
                            room['name'] = room_name
                            room_dict[str(cinema_id)+room_name] = room

                            # add to seat list
                            for i in range(1, 11):
                                for j in range(1, 11):
                                    seat = {}
                                    seat['room_id'] = room_id
                                    seat['row_'] = i
                                    seat['column_'] = j
                                    seat_list.append(seat)
                        else:
                            room_id = room_dict[str(cinema_id)+room_name]['id']

                        # add to show list
                        if not show_dict.has_key(str(movie_id)+str(room_id)):
                            show_id = len(show_dict) + 1
                            show = {}
                            show['id'] = show_id
                            show['room_id'] = room_id
                            show['movie_id'] = movie_id
                            show['time'] = show_time
                            show['language'] = show_language
                            show['price'] = show_price
                            show_dict[str(movie_id)+str(room_id)] = show
                        else:
                            show_id = show_dict[str(movie_id)+str(room_id)]['id']

                        print "....get show: " + str(show_id) + " ok"

        print '====get movie_id: ' + str(movie_id) + " ok"

    return list(location_dict.values()), list(cinema_dict.values()), list(room_dict.values()), list(show_dict.values()), seat_list

# 正则匹配提取cinema信息
def extract_cinema_info(cinema_html_raw):
    cinema_info_list = []

    first_info_list = re.findall(r'<div class="J-cinema-item cinema-item cf"[\s\S]*?>[\s\S]*?<div class="cinema-item__block cinema-item__block--detail"[\s\S]*?>([\s\S]*?)</div>[\s\S]*?<a class="J-select-dialog btn btn-hot btn-small btn-block--seat__btn"([\s\S]*?)>[\s\s]*?</div>', cinema_html_raw)

    for first_info in first_info_list:
        cinema_info_tmp_list = re.findall(r'<a class="link--black__green"[\s\S]*?>([\s\S]*?)</a>[\s\S]*?<strong[\s\S]*?>([\s\S]*?)</strong>[\s\S]*?<dd class="cinema-info-row__value"[\s\S]*?>([\s\S]*?)</dd>', first_info[0])
        show_url_info_tmp_list = re.findall(r'data-params[\s\S]*?"date":"([\s\S]*?)"[\s\S]*?"geo":"([\s\S]*?)"[\s\S]*?"movieId":"([\s\S]*?)"[\s\S]*?"cinemaId":"([\s\S]*?)"[\s\S]*?"pid":"([\s\S]*?)"', first_info[1])

        if len(cinema_info_tmp_list) > 0 and len(show_url_info_tmp_list) > 0:
            info = cinema_info_tmp_list[0]
            # 去除前三个中文作为location，每个中文长度为3
            location_name = info[2].strip()[0:9]
            cinema_name = info[0].strip()
            cinema_rating = info[1].strip()
            cinema_address = info[2].strip()
            info = show_url_info_tmp_list[0]
            show_url = "http://www.meituan.com/movie/showlist/" + info[2].strip() + "/" + info[4].strip() + "/" + info[3].strip() + "/" + info[0].strip() + "/" + info[1].strip()
            cinema_info = []
            cinema_info.append(location_name)
            cinema_info.append(cinema_name)
            cinema_info.append(cinema_rating)
            cinema_info.append(cinema_address)
            cinema_info.append(show_url)
            cinema_info_list.append(cinema_info)

    return cinema_info_list

# 正则匹配提取show信息
def extract_show_info(show_html_raw):
    show_info_list = []

    first_info_list = re.findall(r'<table[\s\S]*?>([\s\S]*?)</table>', show_html_raw.decode("raw_unicode_escape").encode("utf-8").replace("\\", ""))

    for first_info in first_info_list:
        info_list = re.findall(r'<span class="start-time"[\s\S]*?>([\s\S]*?)</span>[\s\S]*?<span class="end-time"[\s\S]*?>([\s\S]*?)</span>[\s\S]*?<td[\s\S]*?>([\s\S]*?)</td>[\s\S]*?<td[\s\S]*?>([\s\S]*?)</td>', first_info)

        for info in info_list:
            room_name = info[3].strip()
            show_time = info[0].strip() + " - " + info[1].strip()
            show_language = info[2].strip()
            show_price = 34 + random.randint(0, 5)
            show_info = []
            show_info.append(room_name)
            show_info.append(show_time)
            show_info.append(show_language)
            show_info.append(show_price)
            show_info_list.append(show_info)

    return show_info_list

# 爬取信息并生成sql文件
def crawl_and_gen_sql_file(movie_list, sql_file_path):
    in_file = open(unicode('../data/insert_info.sql', 'utf-8'), 'w')
    in_file.write("")

    data, headers = crawl_init(False, True)
    location_list, cinema_list, room_list, show_list, seat_list = crawl_and_extrat(movie_list, data, headers)

    gen_sql.gen_sql_file("location", location_list, sql_file_path, 'a')
    gen_sql.gen_sql_file("cinema", cinema_list, sql_file_path, 'a')
    gen_sql.gen_sql_file("room", room_list, sql_file_path, 'a')
    gen_sql.gen_sql_file("seat", seat_list, sql_file_path, 'a')
    gen_sql.gen_sql_file("show", show_list, sql_file_path, 'a')

    return 'ok'

if __name__ == '__main__':
    print 'start...'

    sql_file_path = "../data/insert_info.sql"

    # test
    # movie_list = []
    # movie = []
    # movie.append("http://www.meituan.com/dianying/1205313?#content")
    # movie.append(1)
    # movie_list.append(movie)

    in_file = open('../data/show_url.list', 'r')
    sql_list = in_file.read()
    movie_list = list(eval(sql_list))

    print crawl_and_gen_sql_file(movie_list, sql_file_path)

    # data, headers = crawl_init(False, True)
    # headers['X-Requested-With'] = 'XMLHttpRequest'
    # show_html_raw = crawl("http://gz.meituan.com/movie/showlist/249895/92813531/15803/2017-06-10/all", data, headers)
    # print extract_show_info(show_html_raw)

    print '...end'
