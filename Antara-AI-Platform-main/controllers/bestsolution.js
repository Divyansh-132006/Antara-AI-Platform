import geminiresponseexplanation from "../services/geminiresponseexplanation.js";
import geminiresponsereasoning from "../services/geminiresponsereasoning.js";
import geminiresponsecritics from "../services/geminiresponsecritics.js";
import geminiresponseconsensus from "../services/geminiresponseconsensus.js";
import geminiresponsehallucination from "../services/geminiresponsehallucination.js";
import geminiresponsefinal from "../services/geminiresponsefinal.js";
 async function antaraPipeline(userQuestion) {
  const [explanation, reasoning] = await Promise.all([
    geminiresponseexplanation(userQuestion),
    geminiresponsereasoning(userQuestion)
       ]);

  const critics = await geminiresponsecritics(explanation);

  const consensusInput = `
    Question:
         ${userQuestion}

          Explanaton Answer:
         ${explanation}

          Reasoning Answer:
       ${reasoning}
`;
  const consensus = await geminiresponseconsensus(consensusInput);

  const synthesisInput = `
User Question:
${userQuestion}

Explanation:
${explanation}

Reasoning:
${reasoning}

Critic Notes:
${critics}

Consensus Analysis:
${consensus}
`;

  const finalAnswer = await geminiresponsefinal(synthesisInput);

  const safety = await geminiresponsehallucination(finalAnswer);

  return {
    finalAnswer,
    safety
  };
}


export default antaraPipeline