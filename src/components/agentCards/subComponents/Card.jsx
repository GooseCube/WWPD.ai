import { useContext, useState } from "react";
import { updateAgent } from "../../../firebase/firebaseDB";
import { updateAgentState } from "../../../modules/momentum/speech/helperFunctions";
import { AuthContext } from "../../../firebase/AuthProvider";

function Card({ agent, agentImage, editAgent }) {
  const { setAgents } = useContext(AuthContext)
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
  };

  if (editAgent) {
    return (
      <div
        className="agent-sprite-image"
        style={{
          backgroundImage: agentImage ? `url(${agentImage.default})` : "none",
          width: "32px",
          height: "32px",
        }}>
        <form className="agent-edit-form" onSubmit={handleEditAgent}>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label>
            Career:
            <input
              type="text"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            />
          </label>
          <label>
            Specialty:
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </label>
          <label>
            Personality:
            <input
              type="text"
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }

  if (!editAgent) {
    return (
      <>
        <div
          className="agent-sprite-image"
          style={{
            backgroundImage: agentImage ? `url(${agentImage.default})` : "none",
            width: "32px",
            height: "32px",
          }}
        />
        <p>AGE: {agent.age}</p>
        <p>CAREER: {agent.career}</p>
        <p>SPECIALTY: {agent.specialty}</p>
        <p>PERSONALITY: {agent.personality}</p>
      </>
    );
  }
}

export default Card;
