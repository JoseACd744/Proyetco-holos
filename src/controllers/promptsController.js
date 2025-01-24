const { Prompt } = require('../models');

exports.getPromptsByAssistant = async (req, res) => {
  const { assistantId } = req.params;
  try {
    const prompts = await Prompt.findAll({ where: { assistantId } });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPrompt = async (req, res) => {
  const { assistantId } = req.params;
  const { content } = req.body;

  try {
    const lastPrompt = await Prompt.findOne({
      where: { assistantId },
      order: [['version', 'DESC']],
    });
    const version = (lastPrompt?.version || 0) + 1;

    const prompt = await Prompt.create({ assistantId, version, content });
    res.status(201).json(prompt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePrompt = async (req, res) => {
  const { id } = req.params;
  try {
    const prompt = await Prompt.findByPk(id);
    if (!prompt) return res.status(404).json({ error: 'Prompt not found' });

    await prompt.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};