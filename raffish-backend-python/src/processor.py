from percolate import Percolate
from sprinklr import Sprinklr


def process_dataframe(df):
    sprinklr_obj = Sprinklr()
    # print(df.columns)

    for i in range(len(df.index)):
        row = df.iloc[i]
        percolate_obj = Percolate(row)
        sprinklr_obj.init_with_percolate(percolate_obj)
        sprinklr_obj.create_campaign()