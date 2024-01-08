import pandas as pd
import openpyxl as oxl
from percolate import Percolate
from sprinklr import Sprinklr

df = pd.read_excel('/home/ec2-user/raffish-all/small_excel.xlsx')

row = df.iloc[2]


percolate_obj = Percolate(row)

sprinklr_obj = Sprinklr(percolate_obj)

sprinklr_obj.create_briefs(2000238_68)

# print(sprinklr_obj.campaign_name)