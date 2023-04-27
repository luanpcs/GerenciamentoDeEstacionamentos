const router = require('express').Router()
const Veiculo = require('./mongoose_model.js');

// cadastrar cliente
router.post('/api/add', async(req, res) =>
{ 
    try 
    {
        const { nome, modelo, placa } = req.body; // pegando as informações do corpo da requisição
        const veiculo = new Veiculo({ nome, modelo, placa }); // criando uma nova instância do modelo do veículo com as informações
        await veiculo.save(); // salvando no banco de dados
        res.status(201).send(veiculo); // enviando a resposta com o veículo salvo
    }
    catch (err)
    {
        console.error(err);
        res.status(500).send('Erro ao salvar o veículo no banco de dados');
    }
})

// listar todos os clientes cadastrados
router.get('/api/veiculos_cadastrados', async (req, res) =>
{
    try 
    {
      const veiculos = await Veiculo.find();
      res.send(veiculos);
    }
    catch (err)
    {
      res.status(500).send(err);
    }
})

// apagar um cliente
router.delete('/api/veiculos/:id', (req, res) =>
{
    Veiculo.findByIdAndDelete(req.params.id)
    .then(() =>
    {
        res.send('Veículo excluído com sucesso!')
    })
    .catch(error =>
    {
        console.log(error);
        res.status(500).send('Erro ao excluir o veículo!')
    })
})

router.get('/api/procurar_veiculo', (req, res) =>
{
    const searchValue = req.query.searchValue;
    // Use o Mongoose para buscar os dados do veículo no banco de dados usando o valor da pesquisa
    Veiculo.find({$or: [
      { nomeProprietario: {$regex: searchValue, $options: "i"} },
      { modelo: {$regex: searchValue, $options: "i"} },
      { placa: {$regex: searchValue, $options: "i"} }
    ]}, (err, veiculos) => {
      if (err) {
        console.error(err)
        res.status(500).send(err)
      } else {
        res.status(200).json(veiculos)
      }
    })
})

module.exports = router