/* eslint-disable react/prop-types */
// React
import { useState } from "react";

import { pushNewMomentTemplate } from "../../../firebase/firebaseTemplates";

function TemplateEditor({ template, blankTemplate, setTemplate }) {
  const initialFormDataState = {
    title: "",
    initialInstruction: "",
    initialContext: "",
    initialQuestion: "",
    finalPrompt: "",
    finalInstruction: "",
    finalContext: "",
  };

  const [formData, setFormData] = useState(initialFormDataState);

  const handleClear = (event) => {
    event.preventDefault();
    setFormData(initialFormDataState);
    setTemplate(template);
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleTemplateSubmission = async (event) => {
    event.preventDefault();
    try {
      const newTemplate = {
        title: formData.title || template.title,
        initialPrompt: {
          instruction:
            formData.initialInstruction || template.initialPrompt.instruction,
          context: formData.initialContext || template.initialPrompt.context,
          question: formData.initialQuestion || template.initialPrompt.question,
        },
        finalPrompt: {
          instruction:
            formData.finalInstruction || template.finalPrompt.instruction,
          context: formData.finalContext || template.finalPrompt.context,
        },
      };
      console.log("Submitted New Template:\n", newTemplate);
      await pushNewMomentTemplate(newTemplate);
    } catch (error) {
      console.error("Unable to push new template to Firebase", error);
    } finally {
      setTemplate(blankTemplate);
      setFormData(initialFormDataState);
    }
  };

  return (
    <div className="template-container">
      <h1 className="template-title text-center">Moments Template Editor</h1>
      <form className="template-form" onSubmit={handleTemplateSubmission}>
        {/* Template Title */}
        <label htmlFor="title" className="template-title template-label">
          Title:
        </label>
        <input
          placeholder={template.title}
          id="title"
          type="text"
          className="template-title"
          value={formData.title}
          onChange={handleInputChange}
        />

        {/* Template Initial Instruction */}
        <label
          htmlFor="initialInstruction"
          className="template-initial-instruction template-label">
          Initial Instruction:
        </label>
        <textarea
          id="initialInstruction"
          type="text"
          className="template-initial-instruction"
          placeholder={template.initialPrompt.instruction}
          value={formData.initialInstruction}
          onChange={handleInputChange}
        />

        {/* Template Initial Context */}
        <label
          htmlFor="initialContext"
          className="template-initial-context template-label">
          Initial Context:
        </label>
        <textarea
          id="initialContext"
          type="text"
          className="template-initial-context"
          placeholder={template.initialPrompt.context}
          value={formData.initialContext}
          onChange={handleInputChange}
        />

        {/* Template Initial Question */}
        <label
          htmlFor="initialQuestion"
          className="template-initial-question template-label">
          Initial Question:
        </label>
        <textarea
          id="initialQuestion"
          type="text"
          className="template-initial-question"
          placeholder={template.initialPrompt.question}
          value={formData.initialQuestion}
          onChange={handleInputChange}
        />

        {/* Template Final Instruction */}
        <label
          htmlFor="finalInstruction"
          className="template-initial-instruction template-label">
          Final Instruction:
        </label>
        <textarea
          id="finalInstruction"
          type="text"
          className="template-final-instruction"
          placeholder={template.finalPrompt.instruction}
          value={formData.finalInstruction}
          onChange={handleInputChange}
        />

        {/* Template Final Context */}
        <label
          htmlFor="finalContext"
          className="template-final-context template-label">
          Final Context:
        </label>
        <textarea
          id="finalContext"
          type="text"
          className="template-final-context"
          placeholder={template.finalPrompt.context}
          value={formData.finalContext}
          onChange={handleInputChange}
        />

        <div className="template-form-buttons d-flex justify-content-center gap-3">
          <button className="submit" type="submit">
            Submit
          </button>
          <button className="clear" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default TemplateEditor;
