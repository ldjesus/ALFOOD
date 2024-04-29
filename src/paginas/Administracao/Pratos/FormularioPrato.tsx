import { Box, Button, TextField, Typography, Container, Toolbar, Link, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IPrato from "../../../interfaces/IPrato"
import http from "../../../http"
import ITag from "../../../interfaces/ITag"
import IRestaurante from "../../../interfaces/IRestaurante"


const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tag, setTag] = useState('')
    const [restaurante, setRestaurante] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const parametros = useParams()

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])


    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`pratos/${parametros.id}/`, {
                nome: nomePrato
            })
                .then(() => {
                    alert('Prato foi atualizado com sucesso')
                })

        } else {
            http.post('pratos/', {
                nome: nomePrato
            })
                .then(() => {
                    alert('O prato salvo com sucesso')
                })

        }


    }

    return (
        <>
            <Box>
                <Container maxWidth="lg" sx={{ mt: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                            <Typography component="h1" variant="h6">Formulário de Prato</Typography>
                            <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
                                <TextField
                                    value={nomePrato}
                                    onChange={evento => setNomePrato(evento.target.value)}
                                    label="Nome do Prato"
                                    variant="standard"
                                    fullWidth
                                    required
                                    margin="dense"
                                />
                                <TextField
                                    value={descricao}
                                    onChange={evento => setDescricao(evento.target.value)}
                                    label="Descricao"
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="select-tag">Tag</InputLabel>
                                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                                        {tags.map(tag =>
                                            <MenuItem key={tag.id} value={tag.value}>
                                                {tag.value}
                                            </MenuItem>)}
                                    </Select>
                                </FormControl>
                                <FormControl margin="dense" fullWidth>
                                    <InputLabel id="select-restaurante">Restaurante</InputLabel>
                                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                                        {restaurantes.map(restaurante =>
                                            <MenuItem key={restaurante.id} value={restaurante.nome}>
                                                {restaurante.nome}
                                            </MenuItem>)}
                                    </Select>
                                </FormControl>
                                <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}

export default FormularioPrato