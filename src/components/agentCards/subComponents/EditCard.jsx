import { useContext, useState } from "react";
import { updateAgent } from "../../../firebase/firebaseAgents";
import { updateAgentState } from "../../../modules/momentum/speech/helperFunctions";
import { AuthContext } from "../../contextProviders/AuthProvider";

// Builds the form to edit a single agent persona
function EditCard({ index, agent, agentImage, setEditAgent }) {
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
    <div className="edit-agent-persona-card border rounded p-2" key={index}>
      <div className="header d-flex">
        <h2>{agent.name}</h2>
      </div>
      <div
        className="agent-sprite-image"
        style={{
          backgroundImage: agentImage ? `url(${agentImage.default})` : "none",
          width: "32px",
          height: "32px",
        }}></div>

      <form className="agent-edit-form" onSubmit={handleEditAgent}>
        <div className="top-row">
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
        </div>
        <div className="body-row">
          <label htmlFor="specialty">Specialty:</label>
          <textarea
            id="specialty"
            rows="2"
            wrap="soft"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <label htmlFor="personality">Personality:</label>
          <textarea
            id="personality"
            rows="3"
            wrap="soft"
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
          />
        </div>
        <div className="btn-container">
          <button className="edit-save" type="submit">
            Save
          </button>
          <button
            className="edit-exit"
            type="button"
            onClick={() => setEditAgent(null)}>
            Exit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCard;
