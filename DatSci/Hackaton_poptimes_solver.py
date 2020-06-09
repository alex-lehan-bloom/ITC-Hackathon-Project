
import pandas as pd
import json


def min_pop(data):
    number_of_places = 5
    pos_poptimes = []
    column_names = ['id', 'DoW', 0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    for state in data:
        for poptime in state['populartimes']:
            pos_poptimes.append([state['id'],poptime['name']]+poptime['data'])
    pos_poptimes = pd.DataFrame(data=pos_poptimes, columns =column_names)
    # create add info table to each uid
    pos_info = []
    column_names1 = ['id', 'name', 'address', 'types', 'coordinates', 'rating', 'rating_n', 'time_wait', 'time_spent']
    for state in data:
        dictlist =[]
        for key in state:
            if key !='populartimes':
                dictlist.append(state.get(key, 'n.a.'))
        pos_info.append(dictlist)
    pos_info = pd.DataFrame(data=pos_info, columns =column_names1)
    # create optimum table
    densitiy = pos_poptimes.iloc[:,2:-1] # get array of times only
    minmnumID = densitiy[densitiy != 0].min(axis=1).sort_values()[0:number_of_places].index
    minimum_pop = pos_poptimes.loc[minmnumID]
    best_hours_by_id = minimum_pop.iloc[:,2::][minimum_pop.iloc[:,2::] > 0].idxmin(axis =1)
    best_id_day_time = pd.concat([minimum_pop.iloc[:,0:2], best_hours_by_id],axis=1)
    best_id_day_time.rename(columns={0: 'hr'}, inplace = True)
    # add info
    inf_dat = pos_info.loc[pos_info['id'].isin(list(minimum_pop['id'])) ][infos_need]
    respdata = pd.merge(best_id_day_time, inf_dat, left_on='id', right_on='id', how='outer' )
    respdata = respdata.to_dict('index')
    result_dict = [x for x in respdata.values()]
    return result_dict


