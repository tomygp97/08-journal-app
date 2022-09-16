import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: "dnv2oo150",
    api_key: "534564788473416",
    api_secret: "nFAbmNAlZHC9k0Fhk-FkxGvJuds",
    secure: true,
});

describe('Tests in fileUpload.js', () => {


    test('should upload correct file to cloudinary', async() => {

        const imageUrl = "https://cdn.pixabay.com/photo/2019/12/11/21/18/landscape-4689328_960_720.jpg"; // url de una imagen de prueba que sacamos de google
        const resp = await fetch( imageUrl ); //hago el fetch del url
        const blob = await resp.blob(); // Investigar
        const file = new File([blob], "foto.jpg"); //creo el archivo

        const url = await fileUpload( file )

        expect( typeof url ).toBe("string");
        // console.log(url);

        const segments = url.split("/");
        const imageId = segments[ segments.length - 1 ].replace(".jpg", "");
        // console.log({imageId});

        const cloudResp = await cloudinary.api.delete_resources([ "journal/" + imageId ], {
            resource_type: "image"
        });
        // console.log({cloudResp});

    });

    test('should return null', async() => {

        const file = new File([], "foto.jpg"); //es como mandar una imagen vacia

        const url = await fileUpload( file )

        expect( url ).toBe(null);

    })


})