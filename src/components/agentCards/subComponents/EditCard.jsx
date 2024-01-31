import { useContext, useState } from "react";
import { updateAgent } from "../../../firebase/firebaseDB";
import { updateAgentState } from "../../../modules/momentum/speech/helperFunctions";
import { AuthContext } from "../../../firebase/AuthProvider";

function EditCard({ index, agent, agentImage, editAgent, setEditAgent }) {
  const { setAgents } = useContext(AuthContext);
  const [age, setAge] = useState(agent.age);
  const [career, setCareer] = useState(agent.career);
  const [specialty, setSpecialty] = useState(agent.specialty);
  const [personality, setPersonality] = useState(agent.personality);

  // Update the changes made to agent persona in Firebase
  const handleEditAgent = async (event) => {
    event.preventDefault(); // prevents refresh of page

    const updatedAgent = {
      ...agent,
      age: age,
      career: career,
      specialty: specialty,
      personality: personality,
    };

    await updateAgentState(setAgents, updateAgent, updatedAgent);

    setEditAgent(null);
  };

  return (
    <div className="agent-persona-card border rounded p-2" key={index}>
      <div className="header d-flex">
        <h2>{agent.name}</h2>
      </div>
      <div
        className="agent-sprite-image"
        style={{
          backgroundImage: agentImage ? `url(${agentImage.default})` : "none",
          width: "32px",
          height: "32px",
        }}>
        <form className="agent-edit-form" onSubmit={handleEditAgent}>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label htmlFor="career">Career:</label>
          <input
            id="career"
            type="text"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
          />
          <label htmlFor="specialty">Specialty:</label>
          <textarea
            id="specialty"
            rows="4"
            wrap="soft"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <label htmlFor="personality">Personality:</label>
          <textarea
            id="personality"
            rows="4"
            wrap="soft"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditCard;
