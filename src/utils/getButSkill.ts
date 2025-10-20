import type ButSkill from "../interfaces/ButSkill";

const getButSkill = (
  allButSkills: ButSkill[],
  butSkillId: number
): ButSkill | undefined => {
  return allButSkills.find((butSkill: ButSkill) => butSkill.id === butSkillId);
};

export default getButSkill;
