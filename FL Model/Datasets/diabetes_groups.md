1. diabetes _ 012 _ health _ indicators _ BRFSS2015.csv is a clean dataset of 253,680 survey responses to the CDC's BRFSS2015. The target variable Diabetes_012 has 3 classes. 0 is for no diabetes or only during pregnancy, 1 is for prediabetes, and 2 is for diabetes. There is class imbalance in this dataset. This dataset has 21 feature variables
https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset?select=diabetes_012_health_indicators_BRFSS2015.csv

Diabetes_012 0 = no diabetes 1 = prediabetes 2 = diabetes
HighBP  0 = no high BP 1 = high BP
HighChol    0 = no high cholesterol 1 = high cholesterol
CholCheck   0 = no cholesterol check in 5 years 1 = yes cholesterol check in 5 years
BMI     Body Mass Index
Smoker  Have you smoked at least 100 cigarettes in your entire life? [Note: 5 packs = 100 cigarettes] 0 = no 1 = yes
Stroke  (Ever told) you had a stroke. 0 = no 1 = yes
HeartDiseaseorAttack        coronary heart disease (CHD) or myocardial infarction (MI) 0 = no 1 = yes
PhysActivity    physical activity in past 30 days - not including job 0 = no 1 = yes
Fruits  Consume Fruit 1 or more times per day 0 = no 1 = yes
Veggies     Consume Vegetables 1 or more times per day 0 = no 1 = yes
HvyAlcoholConsump       Heavy drinkers (adult men having more than 14 drinks per week and adult women having more than 7 drinks per week) 0 = no 1 = yes
AnyHealthcare       Have any kind of health care coverage, including health insurance, prepaid plans such as HMO, etc. 0 = no 1 = yes
NoDocbcCost     Was there a time in the past 12 months when you needed to see a doctor but could not because of cost? 0 = no 1 = yes
GenHlth     Would you say that in general your health is: scale 1-5 1 = excellent 2 = very good 3 = good 4 = fair 5 = poor
MentHlth        Now thinking about your mental health, which includes stress, depression, and problems with emotions, for how many days during the past 30 days was your mental health not good? scale 1-30 days
PhysHlth    Now thinking about your physical health, which includes physical illness and injury, for how many days during the past 30 days was your physical health not good? scale 1-30 days
DiffWalk    Do you have serious difficulty walking or climbing stairs? 0 = no 1 = yes
Sex     0 = female 1 = male
Age     13-level age category (_AGEG5YR see codebook) 1 = 18-24 9 = 60-64 13 = 80 or older
Education       Education level (EDUCA see codebook) scale 1-6 1 = Never attended school or only kindergarten 2 = Grades 1 through 8 (Elementary) 3 = Grades 9 through 11 (Some high school) 4 = Grade 12 or GED (High school graduate) 5 = College 1 year to 3 years (Some college or technical school) 6 = College 4 years or more (College graduate)
Income      Income scale (INCOME2 see codebook) scale 1-8 1 = less than $10,000 5 = less than $35,000 8 = $75,000 or more



2. This dataset provides a comprehensive collection of medical data related to various forms of diabetes, including Steroid-Induced Diabetes, Neonatal Diabetes Mellitus (NDM), Prediabetes, Type 1 Diabetes, and Wolfram Syndrome. It contains multiple features that span genetic markers, environmental factors, lifestyle choices, and other relevant medical assessments. This rich dataset is designed to help researchers, data scientists, and healthcare professionals analyze and understand the complex interactions and risk factors associated with different types of diabetes. No of records - 70k.
https://www.kaggle.com/datasets/ankitbatra1210/diabetes-dataset

Target      The type of diabetes or prediabetic condition diagnosed in the patient. It includes categories such as Steroid-Induced Diabetes, Neonatal Diabetes Mellitus (NDM), Prediabetes, Type 1 Diabetes, and Wolfram Syndrome.
Genetic Markers     Indicates whether specific genetic markers associated with diabetes are present. A "Positive" value means the genetic marker is detected, while "Negative" means it is not.
Autoantibodies      Presence of autoantibodies, which are often associated with autoimmune diabetes. "Positive" indicates the presence of autoantibodies, and "Negative" indicates their absence.
Family History      Presence of autoantibodies, which are often associated with autoimmune diabetes. "Positive" indicates the presence of autoantibodies, and "Negative" indicates their absence.
Environmental Factors       Notes any environmental influences that might contribute to the development of diabetes, such as exposure to certain environmental conditions or lifestyle factors.
Insulin Levels      The insulin levels measured in the patient's blood, typically measured in microunits per milliliter (µU/mL).
Age     The age of the patient at the time of data collection, measured in years.
BMI     The body mass index of the patient, a measure of body fat based on height and weight.
Physical Activity       The level of physical activity of the patient. Categories include "High" for active lifestyles and "Low" for sedentary lifestyles.
Dietary Habits  Describes the patient's eating habits, categorized as "Healthy" or "Unhealthy."
Blood Pressure
Cholesterol Levels
Waist Circumference
Blood Glucose Levels
Ethnicity
Socioeconomic Factors
Smoking Status
Alcohol Consumption
Glucose Tolerance Test
History of PCOS
Previous Gestational Diabetes
Pregnancy History
Weight Gain During Pregnancy
Pancreatic Health
Pulmonary Function
Cystic Fibrosis Diagnosis
Steroid Use History
Genetic Testing
Neurological Assessments
Liver Function Tests
Digestive Enzyme Levels
Urine Test
Birth Weight
Early Onset Symptoms






3. The diabetes_prediction_dataset.csv file contains medical and demographic data of patients along with their diabetes status, whether positive or negative. It consists of various features such as age, gender, body mass index (BMI), hypertension, heart disease, smoking history, HbA1c level, and blood glucose level. The Dataset can be utilized to construct machine learning models that can predict the likelihood of diabetes in patients based on their medical history and demographic details. Record count - 100.0k
https://www.kaggle.com/datasets/iammustafatz/diabetes-prediction-dataset

gender          Gender refers to the biological sex of the individual, which can have an impact on their susceptibility to diabetes. There are three categories in it male ,female and other.
age             Age is an important factor as diabetes is more commonly diagnosed in older adults.Age ranges from 0-80 in our dataset.
hypertension            Hypertension is a medical condition in which the blood pressure in the arteries is persistently elevated. It has values a 0 or 1 where 0 indicates they don’t have hypertension and for 1 it means they have hypertension.
heart_disease           Heart disease is another medical condition that is associated with an increased risk of developing diabetes. It has values a 0 or 1 where 0 indicates they don’t have heart disease and for 1 it means they have heart disease.
smoking_history         Smoking history is also considered a risk factor for diabetes and can exacerbate the complications associated with diabetes.In our dataset we have 5 categories i.e not current,former,No Info,current,never and ever.
bmi         BMI (Body Mass Index) is a measure of body fat based on weight and height. Higher BMI values are linked to a higher risk of diabetes. The range of BMI in the dataset is from 10.16 to 71.55. BMI less than 18.5 is underweight, 18.5-24.9 is normal, 25-29.9 is overweight, and 30 or more is obese.
HbA1c_level             HbA1c (Hemoglobin A1c) level is a measure of a person's average blood sugar level over the past 2-3 months. Higher levels indicate a greater risk of developing diabetes. Mostly more than 6.5% of HbA1c Level indicates diabetes.
blood_glucose_level         Blood glucose level refers to the amount of glucose in the bloodstream at a given time. High blood glucose levels are a key indicator of diabetes.
diabetes        Diabetes is the target variable being predicted, with values of 1 indicating the presence of diabetes and 0