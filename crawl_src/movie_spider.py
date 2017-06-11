# spider.py
# coding=utf-8
# author=zhoujl
#！/usr/bin/python 
import re
import time
import datetime
import os
import sys
import random
import urllib2
import requests
import socket
from urllib2 import URLError, HTTPError

import crawl_film

#默认utf-8 编码
reload(sys)
sys.setdefaultencoding('utf-8')
show_url_List=list()
def url_user_agent(url, mode):
    if mode != 6 or mode != 7:
        #设置使用代理
        enable_proxy = False
        proxy = {'http':'127.0.0.1:9743'}
        proxy_handler = urllib2.ProxyHandler(proxy)
        null_proxy_handler = urllib2.ProxyHandler({})
        if enable_proxy:
            opener = urllib2.build_opener(proxy_handler)
        else:
            opener = urllib2.build_opener(null_proxy_handler)
        # opener = urllib2.build_opener(proxy_support,urllib2.HTTPHandler(debuglevel=1))
        #opener = urllib2.build_opener(proxy_support)
        urllib2.install_opener(opener)
        #添加头信息，模仿浏览器抓取网页，对付返回403禁止访问的问题
        # i_headers = {'User-Agent':'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.6) Gecko/20091201 Firefox/3.5.6'}
        i_headers = {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; it; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11'}
        req = urllib2.Request(url,headers=i_headers)
        try: 
            html = urllib2.urlopen(req)
        except HTTPError, e:
            print 'The server couldn\'t fulfill the request.'  
            print 'Error code: ', e.code
            return ''
        except URLError, e:  
            print 'We failed to reach a server.'  
            print 'Reason: ', e.reason
            return ''
        except socket.error, e:
            print 'Reason: ', e
            return ''
        if url == html.geturl():
            doc = html.read()
            return doc
        return ''
    else:
        doc = requests.get(url).content
        return doc

def safe_replace(content):
	#去掉\n和\r
	content = content.replace('\n', '')
	r = re.compile(r'\'')
	s = r.sub('\\\'',content)
	return s

def get_movie_sql(movie_id, img_url, status, name, rating):
	sql = "INSERT INTO `movie`(id, status , name, img_url, rating) VALUES ("
	#添加 标题、时间、导语、内容、来源
	sql = sql + str(movie_id) + ',' \
	+ str(status) + ',\'' \
	+ safe_replace(name) + '\',\'' \
	+ safe_replace(img_url) + '\',\'' \
	+ safe_replace(rating) +  '\');'

	return sql
def get_movie_description_sql(movie_id, cname, ename, img_url, movie_type, region, length, release_time, user_rating, pro_rating, box_office, profile, actors, pictures):
	sql = "INSERT INTO `movie_desciption`(movie_id, chinese_name, english_name, img_url, type, region, length, release_time, user_rating, professional_rating, box_office, profile, actors, pictures) VALUES ("
	#添加 标题、时间、导语、内容、来源
	sql = sql + str(movie_id) + ',\'' \
	+ safe_replace(cname) + '\',\'' \
	+ safe_replace(ename) + '\',\'' \
	+ safe_replace(img_url) + '\',\'' \
	+ safe_replace(movie_type) + '\',\'' \
	+ safe_replace(region) + '\',\'' \
	+ safe_replace(length) + '\',\'' \
	+ safe_replace(release_time) + '\',' \
	+ safe_replace(str(user_rating)) + ',' \
	+ safe_replace(str(pro_rating)) + ',' \
	+ safe_replace(str(box_office)) + ',\'' \
	+ safe_replace(profile) + '\',\'' \
	+ safe_replace(actors) + '\',\'' \
	+ safe_replace(pictures) +  '\');'

	return sql

def craw_movie_description(movie_id, movie_desciption):
	file_object=open('../data/insert_movie_description.sql','a+')
	html = url_user_agent(movie_desciption, 1)
	try:
		cname = re.findall(re.compile(r'class="name">([\s\S]*?)</h3'), html)[0]
	except IndexError, e:
		cname = re.findall(re.compile(r'class="ename[\s\S]*?">([\s\S]*?)</div'), html)[0]
	ename = re.findall(re.compile(r'class="ename[\s\S]*?">([\s\S]*?)</div'), html)[0]
	img_url = re.findall(re.compile(r'class="avater" src="([\s\S]*?)"'), html)[0]
	movie_type = re.findall(re.compile(r'li class="ellipsis">([\s\S]*?)<'), html)[0]
	movie_factors = re.findall(re.compile(r'li class="ellipsis">([\s\S]*?)<'), html)[1]
	try:
		show_url = re.findall(re.compile(r'class="btn buy"[\s\S]*?href="([\s\S]*?)"'), html)[0]
	except IndexError, e:
		show_url = '#'
	if show_url != '#':
		show_url_List.append((show_url, movie_id))
	try:
		region = re.findall(re.compile(r'([\s\S]*?)/'), movie_factors)[0]
	except IndexError, e:
		region = '中国'
	try:
		length = re.findall(re.compile(r'/([\s\S]*)'), movie_factors)[0]
	except IndexError, e:
		length = '120分钟'
	release_time = re.findall(re.compile(r'li class="ellipsis">([\s\S]*?)<'), html)[2]
	try:
		user_rating = re.findall(re.compile(r'class="star-on" style="width:([\s\S]*?)%'), html)[0]
		user_rating = float(user_rating[0] + '.' + user_rating[1])
	except IndexError, e:
		user_rating = 7.5
	box_office = (random.randint(0,9) + random.randint(0,9)*0.1 + random.randint(0,9)*0.01)*100000000
	profile = re.findall(re.compile(r'(<div class="mod-content"[\s\S]*?)<div class="module"'), html)[0]
	profile = re.findall(re.compile(r'([\s\S]*)</div'), profile)[0]
	actors = re.findall(re.compile(r'(<div class="mod-content"[\s\S]*?)<div class="module"'), html)[1]
	actors = re.findall(re.compile(r'([\s\S]*)</div'), actors)[0]
	pictures = re.findall(re.compile(r'(<div class="mod-content"[\s\S]*?)<div class="module"'), html)[2]
	pictures = re.findall(re.compile(r'([\s\S]*)</div'), pictures)[0]
	try:
		pro_rating = re.findall(re.compile(r'class="star-on" style="width:([\s\S]*?)%'), html)[1]
		pro_rating = float(pro_rating[0] + '.' + pro_rating[1])
	except IndexError, e:
		pro_rating = 7.5
	sql = get_movie_description_sql(movie_id, cname, ename, img_url, movie_type, region, length, release_time, user_rating, pro_rating, box_office, profile, actors, pictures)
	file_object.writelines(sql+'\n')
	
def craw_movie(url, movie_id, status):
	file_object=open('../data/insert_movie.sql','a+')
	html = url_user_agent(url, 1)
	movies = re.findall(re.compile(r'<dd>[\s\S]*?<div class="channel-detail channel-detail-orange[\s\S]*?</div>'), html)
	for movie in movies:
		img_url = re.findall(re.compile(r'img data-src="([\s\S]*?)"'), movie)[0]
		name = re.findall(re.compile(r'title="([\s\S]*?)"'), movie)[0]
		movie_desciption = "http://maoyan.com" + re.findall(re.compile(r'href="([\s\S]*?)"'), movie)[0]
		craw_movie_description(movie_id, movie_desciption)
		try: 
			rating = re.findall(re.compile(r'integer">([\s\S]*?)<'), movie)[0]
			rating = rating + re.findall(re.compile(r'fraction">([\s\S]*?)<'), movie)[0]
		except IndexError, e:
			rating = '暂无评分'
		sql = get_movie_sql(movie_id, img_url, status, name, rating)
		movie_id += 1
		file_object.writelines(sql+'\n')

	return movie_id


def main():
	with open(unicode('../data/insert_movie_description.sql', 'utf-8'), 'w') as infile:
		infile.write('')
	with open(unicode('../data/insert_movie.sql', 'utf-8'), 'w') as infile:
		infile.write('')
	with open(unicode('../data/insert_info.sql', 'utf-8'), 'w') as infile:
		infile.write('')


	urls=['http://maoyan.com/films?showType=1','http://maoyan.com/films?showType=1&offset=30']
	urls1=['http://maoyan.com/films?showType=2']
	#获取今天爬取的文章链接
	movie_id = 1
	for i in range(0, urls.__len__()):
			#爬取主页上的链接，判断是否重复爬取，是则放入列表
			movie_id = craw_movie(urls[i], movie_id, 1)
	for i in range(0, urls1.__len__()):
			#爬取主页上的链接，判断是否重复爬取，是则放入列表
			movie_id = craw_movie(urls1[i], movie_id, 0)
	file_object1=open('../data/show_url.list','a+')
	file_object1.write(repr(show_url_List))


	#mysql_connect(sqlList)


if __name__ == '__main__':
	global file_object
	main()