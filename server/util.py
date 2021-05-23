from tensorflow.keras.models import load_model
import json
import numpy as np

__InternetService = None
__Contract = None
__PaymentMethod = None
__data_columns = None
__model = None


def get_chrn_value(gender, seniorcitizen, partner, dependents, tenure, phoneservice, multiplelines, internetservice, contract,
                                                  paperlessbilling, paymentmethod, monthlycharges, totalcharges):
    try:
        loc_index1 = __data_columns.index(internetservice.lower())
    except:
        loc_index1 = -1

    try:
        loc_index2 = __data_columns.index(contract.lower())
    except:
        loc_index2 = -1

    try:
        loc_index3 = __data_columns.index(paymentmethod.lower())
    except:
        loc_index3 = -1

    x = np.zeros(len(__data_columns))
    x[0] = gender
    x[1] = seniorcitizen
    x[2] = partner
    x[3] = dependents
    x[4] = tenure
    x[5] = phoneservice
    x[6] = multiplelines
    x[13] = paperlessbilling
    x[14] = monthlycharges
    x[15] = totalcharges

    if loc_index1 >= 0:
        x[loc_index1] = 1
    if loc_index2 >= 0:
        x[loc_index2] = 1
    if loc_index3 >= 0:
        x[loc_index3] = 1

    ans = __model.predict(np.round([x]))[0][0]
    if ans >= 0.5:
        return 1
    else:
        return 0


   # return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("loading saved artifacts...start")
    global __data_columns
    global __InternetService
    global __Contract
    global __PaymentMethod

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __InternetService = __data_columns[16:19]
        __Contract = __data_columns[19:22]
        __PaymentMethod = __data_columns[22:]

    global __model
    if __model is None:
        __model = load_model('model1.h5')
    print("loading saved artifacts...done")


def get_InternetService():
    return __InternetService


def get_Contract():
    return __Contract


def get_PaymentMethod():
    return __PaymentMethod


if __name__ == '__main__':
    load_saved_artifacts()
   # print(get_PaymentMethod())
 #   print(get_chrn_value(0, 1, 1, 0, 26, 1, 0, 'internetservice_dsl', 'contract_month-to-month', 1, 'paymentmethod_electronic check',
  #                       95.665, 2510.368186))
    
