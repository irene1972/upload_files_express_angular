const recogerDatos=(req, res) => {
    const imagen=req.file;
    console.log(req.body.tags);
    if(!imagen){
        return res.status(400).json({ error: 'Imagen obligatoria' });
    }
    res.json(imagen);
}
export {
    recogerDatos
}