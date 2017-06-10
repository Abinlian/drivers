# encoding:utf-8
# coding:utf-8
__author__ = 'Abinlian'

# write lines to file
# mode: w, a
def writeLinesToFile(lines, filepath, mode):
    with open(unicode(filepath, 'utf-8'), mode) as infile:
        for tmp in lines:
            infile.writelines(tmp.strip() + '\n')

# gen a insert sql
def gen_sql(table_name, record_dict):
    key_str = ""
    value_str = ""
    for key, value in record_dict.items():
        key_str += key + ", "
        value_str += "'" + str(value) + "', "

    key_len = len(key_str)
    value_len = len(value_str)
    key_str = key_str[0:key_len-2]
    value_str = value_str[0:value_len-2]

    return "INSERT INTO `" + table_name + "`(" + key_str + ") VALUES(" + value_str + ");"

# gen a insert sql file
def gen_sql_file(table_name, record_list, filepath, mode):
    sqls = []
    for record_dict in record_list:
        sqls.append(gen_sql(table_name, record_dict))
    writeLinesToFile(sqls, filepath, mode)

if __name__ == '__main__':
    print 'start...'

    # test
    locations = []
    # for i in range(0, 10):
    #     location = {}
    #     location['id'] = i
    #     location['name'] = str(i)+'name'
    #     locations.append(location)
    #
    # gen_sql_file("location", locations, '../data/location.sql', 'w')

    print '...end'
