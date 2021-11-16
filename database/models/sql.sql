SELECT * FROM covid.assessment;

use covid;

SELECT a.fkPatientId AS userId, user.fullName, a.id AS testId, a.date, a.q_difficultyBreathing, a.q_ageRange, a.q_firstSymptoms, a.q_situation, a.q_secondSymptoms,
  a.q_hasBeenCloseContact, a.q_hasBeenTested, a.q_hasTraveled
  FROM assessment a
  JOIN user ON user.id = a.fkPatientId
  WHERE assignedDoctorId = 11 AND user.fkUserType = 1 AND 
user.active = 1 AND rejected = 0
  ORDER BY a.date ASC;
  
SELECT patient.id AS patientId, ass.id AS assessmentId, ass.date, ass.viewedByNurse, ass.assignedDoctorId, doctor.fullName, app.location, app.dateTime
FROM assessment ass
JOIN user patient ON patient.id = ass.fkPatientId
LEFT JOIN user doctor ON ass.assignedDoctorId = doctor.id
LEFT JOIN appointment app ON app.fkPatientId = patient.id
WHERE ass.id = (select max(id) from assessment where fkPatientId = 1);
