const express = require('express');
const prisma = require('../models/db');

const router = express.Router();

// Listar todos os Remedy
router.get('/', async (req, res) => {
  try {
    const remedies = await prisma.remedy.findMany();
    res.json(remedies);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os medicamentos' });
  }
});

// Buscar um Remedy por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const remedy = await prisma.remedy.findUnique({
      where: { remedy_id: parseInt(id) },
    });
    if (!remedy) {
      return res.status(404).json({ error: 'Medicamento não encontrado' });
    }
    res.json(remedy);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o medicamento' });
  }
});

// Criar um novo Remedy
router.post('/', async (req, res) => {
  const { name, doses_frequency, amount_per_dose, remedy_notes, tube_identifier, remaining_doses, last_dose } = req.body;
  try {
    //const last_dose = '2023-11-28 15:30:00';
    const newRemedy = await prisma.remedy.create({
      data: {
        name,
        doses_frequency,
        amount_per_dose, 
        remedy_notes, 
        tube_identifier: tube_identifier.toString(),
        last_dose,
        remaining_doses
      },
    });
    res.status(201).json(newRemedy);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro ao cadastrar o medicamento' });
  }
});

// Atualizar um Remedy por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, doses_frequency, amount_per_dose, remedy_notes, tube_identifier } = req.body;
  try {
    const updatedRemedy = await prisma.remedy.update({
      where: { remedy_id: parseInt(id) },
      data: {
        name,
        doses_frequency,
        amount_per_dose, 
        remedy_notes, 
        tube_identifier: tube_identifier.toString(),
        last_dose,
        remaining_doses
      },
    });
    res.json(updatedRemedy);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o medicamento' });
  }
});

// Deletar um Remedy por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.remedy.delete({
      where: { remedy_id: parseInt(id) },
    });
    res.json({ message: 'Medicamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar o medicamento' });
  }
});

module.exports = router;
