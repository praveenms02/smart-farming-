import pandas as pd
import pickle
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
import sklearn.metrics as metrics
from sklearn.linear_model import LogisticRegression


PATH = 'Crop_recommendation.csv'

# Load the CSV file data into
# data variable using pandas
data = pd.read_csv(PATH)


features = ['N', 'P', 'K', 'temperature',
            'humidity', 'ph', 'rainfall']


# Put all the input variables into features vector
features = data[['N', 'P', 'K', 'temperature',
                 'humidity', 'ph', 'rainfall']]

# Put all the output into labels array
labels = data['label']


X_train, X_test,\
    Y_train, Y_test = train_test_split(features,
                                       labels,
                                       test_size=0.2,
                                       random_state=42)



# Pass the training set into the
# LogisticRegression model from Sklearn
LogReg = LogisticRegression(random_state=42)\
.fit(X_train, Y_train)

# Predict the values for the test dataset
predicted_values = LogReg.predict(X_test)

# Measure the accuracy of the test 
# set using accuracy_score metric
accuracy = metrics.accuracy_score(Y_test,
                                  predicted_values)



print("Logistic Regression accuracy: ", accuracy)

# Get detail metrics 
print(metrics.classification_report(Y_test,
                                    predicted_values))

filename = 'LogisticRegresion.pkl'
MODELS = './'
# Use pickle to save ML model
pickle.dump(LogReg, open(MODELS + filename, 'wb'))


# Load model
model = pickle.load(open('./LogisticRegresion.pkl', 'rb'))

# Custom input (N, P, K, temperature, humidity, ph, rainfall)
X_new = np.array([[90, 42, 43, 20.5, 82.0, 6.5, 200]])

# Predict
y_pred = model.predict(X_new)
print("Recommended Crop:", y_pred[0])


