import {evaluate} from "../src/Ease";

evaluate `
    
    import http
    
    let server = http()
    let x = 0
    
    server.get("/*", (req, res):
        let path = req.originalUrl
        x = x + 1
        res.send("
            <html lang='pt'>
                <body>
                    <h1>Hi visitor!</h1>
                    <p>You have visited this page "+x+" times.</p>
                    <p>The path you're currently in is "+path+"</p>
                </body>
            </html>
        ")
    )
    
    server.listen(8080, (): print("Listening at port 8080"))
    
`