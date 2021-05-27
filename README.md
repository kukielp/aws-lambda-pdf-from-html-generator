# pdf-maker

```
git clone
sam build
sam deploy --guided

curl --location --request POST 'https://{yourURL}/Prod/hello/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "html" : "<html><body><h1>Repco Crossflow Cylider head <br />for Holden Grey motor</h1> <img width='\''550px'\'' src='\''http://gallery.thegreymotor.com/albums/userpics/10001/IMG_8489.JPG'\''/></body></html>"
}'

And you'll get back a nice PDF