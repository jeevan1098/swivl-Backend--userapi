const { PrismaClient } = require('@prisma/client');
const pdfService = require('../services/pdfService');
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    const user = await prisma.user.create({
      data: { firstName, lastName, phoneNumber, email }
    });

    const pdfPath = await pdfService.generatePdf(user);
    await prisma.user.update({
      where: { id: user.id },
      data: { pdfPath }
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

exports.getUserPdf = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (user && user.pdfPath) {
      res.status(200).json({ pdfPath: user.pdfPath });
    } else {
      res.status(404).json({ error: 'User or PDF not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the PDF path' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email } = req.body;
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { firstName, lastName, phoneNumber, email }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};
