import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import TreatmentProcedure from "../component/TreatmentProcedure";
import FirstPediatricDentistry from "../component/FirstPediatricDentistry";

export default function PediatricDentistry({ patient }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedTeeth, setSelectedTeeth] = useState({});
    const [showTreatment, setShowTreatment] = useState(true)
    const [finalProcedures, setFinalProcedures] = useState([]);
    const [finalTreatmentRecords, setFinalTreatmentRecords] = useState([]);
    const [saved, setSaved] = useState(false);
    const [formData, setFormData] = useState({
        toothName: "",
        dentalCondition: "",
        complaint: "",
        examination: "",
        advice: "",
    });
    const [records, setRecords] = useState([]);


    const location = useLocation();
    const examinationData = location.state?.records || [];


    useEffect(() => {
        console.log("Received ID from route:", id);
    }, [id]);

    const handleNext = () => {
        setShowTreatment(false)
    };

    return (
        showTreatment ? <FirstPediatricDentistry

            id={id}
            saved={saved}
            setSaved={setSaved}
            records={records}
            setRecords={setRecords}
            patient={patient}
            selectedTeeth={selectedTeeth}
            showTreatment={showTreatment}
            setSelectedTeeth={setSelectedTeeth}
            formData={formData}
            handleNext={handleNext}
            setFormData={setFormData}

        /> : <TreatmentProcedure

            id={id}
            finalProcedures={finalProcedures}
            setFinalProcedures={setFinalProcedures}
            finalTreatmentRecords={finalTreatmentRecords}
            examinationData={examinationData}
            records={records}
            setRecords={setRecords}
            setFinalTreatmentRecords={setFinalTreatmentRecords}
            setShowTreatment={setShowTreatment}
        />

    );
}
