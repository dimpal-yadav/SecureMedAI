import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getBaseURL } from '../apiConfig';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import useAxios from '../Utils/axios';

export default function Prediction() {
  const [symptoms, setSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [symptomError, setSymptomError] = useState('');
  const api = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addSymptom = (data) => {
    if (data.symptom && !symptoms.includes(data.symptom)) {
      setSymptoms([...symptoms, data.symptom]);
      reset({ symptom: '' });
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter((symptom) => symptom !== symptomToRemove));
  };

  const predictDisease = async () => {
    setSymptomError('');

    if (symptoms.length === 0) return;

    setIsLoading(true);

    try {
      // Format symptoms for API
      const formattedSymptoms = symptoms.map((symptom) =>
        symptom.toLowerCase().replace(/\s+/g, '_')
      );
      console.log('Formatted Symptoms:', formattedSymptoms);

      const response = await api.post(`${getBaseURL()}/predict/`, {
        symptoms: formattedSymptoms,
      });

      console.log('API Response:', response.data);
      setPredictionResult(response.data);
      console.log(predictionResult);
    } catch (error) {
      setSymptomError(
        error.response?.data?.error ||
          'An error occurred while fetching predictions.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="nav">
        <Navbar />
      </div>

      <div className="prediction-page my-8 bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)] py-10">
        {/* Title */}
        <section className="title-section">
          <div className="mb-16 text-center md:mb-24">
            <h3 className="mb-3 text-2xl font-semibold md:text-3xl">
              Feeling Unwell? Let&apos;s Check
            </h3>
            <p className="m-auto max-w-3xl px-4 text-sm text-gray-600 md:text-base">
              Describe your symptoms, and our AI-powered system will analyze
              them to predict possible diseases—all in just a few seconds
            </p>
          </div>
        </section>

        {/* Symptom Checker */}
        <section className="symptom-section mb-16 md:mb-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6">
              <h4 className="font-medium text-xl">Enter your Symptoms</h4>
            </div>
            <div className="form">
              <form onSubmit={handleSubmit(addSymptom)}>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center">
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-[#a3a3a3] p-3 sm:w-[45%]"
                    placeholder="Type a symptom and press Enter"
                    {...register('symptom', {
                      required: 'Please enter a symptom',
                    })}
                  />
                  <button
                    type="submit"
                    className="mt-2 rounded-2xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:ml-4 sm:mt-0"
                  >
                    Add Symptom
                  </button>
                </div>
                {errors.symptom && (
                  <p className="mb-2 text-sm text-red-500">
                    {errors.symptom.message}
                  </p>
                )}

                <div className="mb-8 flex flex-wrap gap-2 md:gap-4">
                  {symptoms.map((symptom, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-full bg-[#D1FAE5] px-3 py-1 text-[#15803D]"
                    >
                      <button
                        type="button"
                        className="mr-2 text-[#15803D]"
                        onClick={() => removeSymptom(symptom)}
                      >
                        ✕
                      </button>
                      {symptom}
                    </div>
                  ))}
                  {symptoms.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No symptoms added yet. Add your first symptom above.
                    </p>
                  )}
                </div>

                {symptomError && (
                  <p className="mt-3 text-sm text-red-500">{symptomError}</p>
                )}

                <div className="button">
                  <button
                    type="button"
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
                    onClick={predictDisease}
                    disabled={symptoms.length === 0 || isLoading}
                  >
                    {isLoading ? 'Analyzing...' : 'Check My Symptoms'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Results */}
        {predictionResult && (
          <section className="result-section">
            <div className="mx-auto max-w-6xl px-4">
              <div className="title">
                <h3 className="mb-8 text-2xl font-semibold">Results</h3>
              </div>
              <div className="mb-20">
                <div className="w-full rounded-2xl border bg-white px-6 py-8 shadow-lg md:px-10 md:pt-10 md:pb-16 lg:w-[90%]">
                  <h4 className="mb-6 text-xl font-bold">
                    Potential Conditions
                  </h4>

                  {predictionResult.predicted_disease &&
                    predictionResult.predicted_disease.map(
                      (prediction, index) => (
                        <div key={index} className="mb-4 border-b pb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium">
                              {prediction.disease}
                            </span>
                            <span className="text-gray-700 font-medium">
                              {(prediction.probability * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{
                                width: `${prediction.probability * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}

                  {/* Disease Information Section */}
                  {predictionResult.info && (
                    <div className="mt-16 pt-10 border-t">
                      <h3 className="text-2xl font-bold mb-10 text-[#1E40AF]">
                        About {predictionResult.predicted_disease[0].disease}
                      </h3>

                      {/* Description */}
                      <div className="mb-6">
                        <h5 className="font-semibold mb-2">Description</h5>
                        <p className="text-gray-700">
                          {predictionResult.info.description}
                        </p>
                      </div>

                      {/* Symptoms */}
                      <div className="mb-6">
                        <h5 className="font-semibold mb-2">Common Symptoms</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {predictionResult.info.common_symptoms.map(
                            (symptom, index) => (
                              <li key={index} className="text-gray-700">
                                {symptom}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      {/* Prevention Tips */}
                      <div className="mb-6">
                        <h5 className="font-semibold mb-2">Prevention Tips</h5>
                        <ul className="list-disc pl-5 space-y-1">
                          {predictionResult.info.prevention_tips.map(
                            (tip, index) => (
                              <li key={index} className="text-gray-700">
                                {tip}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  )}

                  {predictionResult.warning && (
                    <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
                      <p>{predictionResult.warning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Disease-Specific Doctor Recommendations */}
        {predictionResult && predictionResult.disease_doctors && Object.keys(predictionResult.disease_doctors).length > 0 && (
          <section className="disease-doctors-section mb-16">
            <div className="mx-auto max-w-6xl px-4">
              <div className="title">
                <h3 className="mb-6 text-2xl font-semibold">
                  Specialists for Each Condition
                </h3>
                <p className="text-gray-600 mb-8">
                  Find the right specialist for each predicted condition:
                </p>
              </div>
              
              <div className="space-y-8">
                {predictionResult.predicted_disease.map((prediction, index) => {
                  const diseaseName = prediction.disease;
                  const doctors = predictionResult.disease_doctors[diseaseName] || [];
                  
                  return (
                    <div key={index} className="bg-white rounded-lg border p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-semibold text-blue-600">
                          {diseaseName}
                        </h4>
                        <span className="text-lg font-medium text-gray-700">
                          {(prediction.probability * 100).toFixed(0)}% probability
                        </span>
                      </div>
                      
                      {doctors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {doctors.map((doctor, doctorIndex) => (
                            <div key={doctorIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <img
                                  src="/images/doctor.png"
                                  alt="Doctor"
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                                <div>
                                  <h5 className="font-medium">{doctor.name}</h5>
                                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                                </div>
                              </div>
                              <Link
                                to={`/appointment?doctorId=${doctor.id}&doctorName=${doctor.name}&doctorSpecialization=${doctor.specialization}`}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                              >
                                Book
                              </Link>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No specialists available for this condition.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Recommended Doctors */}
        {predictionResult && predictionResult.recommended_doctors && predictionResult.recommended_doctors.length > 0 && (
          <section className="doctor-section">
            <div className="mx-auto max-w-6xl px-4">
              <div className="title">
                <h3 className="mb-6 text-2xl font-semibold">
                  Recommended Doctors
                </h3>
                <p className="text-gray-600 mb-8">
                  Based on your symptoms, here are specialists who can help you:
                </p>
              </div>
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {predictionResult.recommended_doctors.map((doctor, index) => (
                    <div key={doctor.id} className="w-full rounded-lg border bg-[linear-gradient(to_bottom,#EFF6FF,#FFFFFF)] p-6 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative h-16 w-16 mb-4">
                          <img
                            src="/images/doctor.png"
                            alt="Doctor"
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="details mb-4">
                          <h5 className="text-lg font-medium mb-2">
                            {doctor.name}
                          </h5>
                          <p className="text-gray-600 text-sm mb-2">
                            {doctor.specialization}
                          </p>
                          {doctor.related_diseases && doctor.related_diseases.length > 0 && (
                            <div className="text-xs text-blue-600">
                              <p className="font-medium mb-1">Specializes in:</p>
                              {doctor.related_diseases.map((disease, idx) => (
                                <span key={idx} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1 mb-1">
                                  {disease.name} ({(disease.probability * 100).toFixed(0)}%)
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button className="rounded-2xl bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors">
                          <Link
                            to={`/appointment?doctorId=${doctor.id}&doctorName=${doctor.name}&doctorSpecialization=${doctor.specialization}`}
                          >
                            Book Appointment
                          </Link>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
