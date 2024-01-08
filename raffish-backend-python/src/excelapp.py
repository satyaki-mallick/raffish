import pandas as pd
import openpyxl as oxl
from percolate import Percolate
from sprinklr import Sprinklr

df = pd.read_excel('/home/ec2-user/raffish-all/small_excel_2_row.xlsx')

# row = df.iloc[1]

# {'1564643032768619980_B2C_Sale_EMEA/APAC_2023': '2000238_91'}

sprinklr_obj = Sprinklr()

for i in range(len(df.index)):
    row = df.iloc[i]
    percolate_obj = Percolate(row)
    sprinklr_obj.init_with_percolate(percolate_obj)
    sprinklr_obj.create_campaign()

