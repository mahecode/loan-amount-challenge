const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

if(process.env.NODE_ENV === 'production') {
    //static folder 
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(port, ()=> console.log(`server running on ${port}`));