import { useState } from "react";
import A from '../assets/Images/A.png';
import B from '../assets/Images/B.png';
import C from '../assets/Images/C.png';
import D from '../assets/Images/D.png';
import E from '../assets/Images/E.png';
import F from '../assets/Images/F.png';
import G from '../assets/Images/G.png';
import H from '../assets/Images/H.png';
import I from '../assets/Images/I.png';
import J from '../assets/Images/J.png';
import K from '../assets/Images/K.png';
import L from '../assets/Images/L.png';
import M from '../assets/Images/M.png';
import N from '../assets/Images/N.png';
import O from '../assets/Images/O.png';
import P from '../assets/Images/P.png';
import Q from '../assets/Images/Q.png';
import R from '../assets/Images/R.png';
import S from '../assets/Images/S.png';
import T from '../assets/Images/T.png';

const teethData = [
  { id: 1, name: "Upper Right Second Molar", image: A },
  { id: 2, name: "Upper Right First Molar", image: B },
  { id: 3, name: "Upper Right Canine (Cuspid)", image: C },
  { id: 4, name: "Upper Right Lateral Incisor ", image: D },
  { id: 5, name: "Upper Right Lateral Incisor", image: E },
  { id: 6, name: "Upper Left Central Incisor", image: F },
  { id: 7, name: "Upper Left Lateral Incisor  ", image: G },
  { id: 8, name: " Upper Left Canine (Cuspid)", image: H },
  { id: 9, name: "Upper Left First Molar", image: I },
  { id: 10, name: "Upper Left Second Molar", image: J },
  { id: 11, name: "Lower Left Second Molar)", image: K },
  { id: 12, name: "Lower Left First Molar", image: L },
  { id: 13, name: "Lower Left Canine (Cuspid)", image: M },
  { id: 14, name: "Lower Left Lateral Incisor", image: N },
  { id: 15, name: "Lower Left Central Incisor", image: O },
  { id: 16, name: "Lower Right Central Incisor", image: P },
  { id: 17, name: "Lower Right Lateral Incisor", image: Q },
  { id: 18, name: "Lower Right Canine (Cuspid)", image: R },
  { id: 19, name: "Lower Right First Molar", image: S },
  { id: 20, name: "Lower Right Second Molar", image: T },
];

export default function Pediatric_Dentistry() {
  const [selectedTeeth, setSelectedTeeth] = useState([]);
  const [dentalCondition, setDentalCondition] = useState('');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [examination, setExamination] = useState('');
  const [advice, setAdvice] = useState('');
  const [savedData, setSavedData] = useState([]);

  const handleToothClick = (tooth) => {
    if (selectedTeeth.includes(tooth)) {
      setSelectedTeeth(selectedTeeth.filter((t) => t !== tooth));
    } else {
      setSelectedTeeth([...selectedTeeth, tooth]);
    }
  };

  const handleSave = () => {
    if (!selectedTeeth.length || !dentalCondition || !chiefComplaint || !examination || !advice) {
      alert("Please fill all fields!");
      return;
    }

    const newData = {
      teethName: selectedTeeth.map((tooth) => tooth.name).join(", "),
      dentalCondition,
      chiefComplaint,
      examination,
      advice
    };

    setSavedData([...savedData, newData]);

    setSelectedTeeth([]);
    setDentalCondition('');
    setChiefComplaint('');
    setExamination('');
    setAdvice('');
  };

  const handleDelete = (indexToDelete) => {
    const newData = savedData.filter((_, idx) => idx !== indexToDelete);
    setSavedData(newData);
  };

 
}
