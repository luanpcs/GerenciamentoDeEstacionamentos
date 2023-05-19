import express from 'express';
import { ModeloEstacionamento, ModeloUtilizacao, ModeloStatusVagas, ModeloRegistrosTotais, ModeloLogins } from './models.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const {user, senha} = req.body;
        const model = new ModeloLogins({user, senha});
        await model.save();
        res.status(200).json({ message: 'Dados enviados com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar dados.' });
    }
}
);

router.get('/login', async (req, res) => {
    try {
        const dados = await ModeloLogins.find();
        res.status(200).json(dados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter os dados de tempo real.' });
    }
});


router.post('/registrosTotais', async (req, res) => {
    try {
        const { nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor } = req.body;
        const model = new ModeloRegistrosTotais({ nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor });
        await model.save();
        res.status(200).json({ message: 'Dados enviados com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar dados.' });
    }
}
);

router.get('/registrosTotais', async (req, res) => {
    try {
        const dados = await ModeloRegistrosTotais.find();
        res.status(200).json(dados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter os dados de tempo real.' });
    }
});

router.post('/tempoReal', async (req, res) => {
    try {
        const { nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor } = req.body;
        const model = new ModeloUtilizacao({ nome, modelo, placa, timestampEntrada, timestampSaida, vaga, valor });
        await model.save();
        res.status(200).json({ message: 'Dados enviados com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar dados.' });
    }
}
);

router.put('/tempoReal/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, modelo, placa, timestampSaida, valor } = req.body;

        const updatedModel = await ModeloUtilizacao.findByIdAndUpdate(id, {
            nome,
            modelo,
            placa,
            timestampSaida,
            valor
        }, { new: true });

        if (!updatedModel) {
            return res.status(404).json({ message: 'Registro não encontrado.' });
        }

        res.status(200).json({ message: 'Registro atualizado com sucesso!', data: updatedModel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar registro.' });
    }
}
);

router.delete('/tempoReal/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await ModeloUtilizacao.findByIdAndDelete(id);
        res.status(200).json({ message: 'Registro excluído com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir o registro.' });
    }
});

router.get('/tempoReal', async (req, res) => {
    try {
        const dados = await ModeloUtilizacao.find();
        res.status(200).json(dados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter os dados de tempo real.' });
    }
});

router.post('/vagas', async (req, res) => {
    try {
        const { vagas } = req.body;
        const model = new ModeloStatusVagas({ vagas });
        await model.save();
        res.status(200).json({ message: 'Dados enviados com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar dados.' });
    }
});

router.put('/vagas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { vagas } = req.body;
        const updatedModel = await ModeloStatusVagas.findByIdAndUpdate(id, { vagas }, { new: true });
        res.status(200).json({ message: 'Dados atualizados com sucesso!', data: updatedModel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar dados.' });
    }
});

router.get('/vagas', async (req, res) => {
    try {
        const models = await ModeloStatusVagas.find();
        res.status(200).json(models);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter dados de vagas.' });
    }
});

router.post('/cadastro', async (req, res) => {
    try {
        const { nome, modelo, placa, registrado } = req.body;
        const model = new ModeloEstacionamento({ nome, modelo, placa, registrado });
        await model.save();
        res.status(200).json({ message: 'Dados enviados com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar dados.' });
    }
});

router.get('/Getcadastro', async (req, res) => {
    try {
        const data = await ModeloEstacionamento.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar dados.' });
    }
});

router.delete('/descadastro/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await ModeloEstacionamento.findByIdAndDelete(id);
        res.status(200).json({ message: 'Dados excluídos com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir dados.' });
    }
});

router.put('/cadastro/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, modelo, placa, registrado } = req.body;

        const updatedModel = await ModeloEstacionamento.findByIdAndUpdate(
            id,
            { nome, modelo, placa, registrado },
            { new: true }
        );

        if (!updatedModel) {
            return res.status(404).json({ message: 'Registro não encontrado.' });
        }

        res.status(200).json({ message: 'Registro atualizado com sucesso!', data: updatedModel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar registro.' });
    }
});

export default router;