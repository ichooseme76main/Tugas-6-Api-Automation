import fetch from "node-fetch";
import { expect } from "chai";
import Ajv from "ajv";
import { schema_postuser, schema_getuser } from "../schema/reqresSchema.js"; 

describe("API Tests Suite", function () {
    const baseURL = "https://reqres.in";

    it("CREATE - Create New User", async function () {
        const newPost = {
            name: "Arthur",
            job: "Boss"
        };

        const response = await fetch(`${baseURL}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "reqres_6c6479c439a948c781704b147254d732"
            },
            body: JSON.stringify(newPost)
        });

        expect(response.status, 'testcase nya error').to.equal(201);

        const hasil = await response.json();

        expect(hasil.name, 'nama nya tidak sesuai').to.equal("Arthur");

        const ajv = new Ajv();
        const validate = ajv.compile(schema_postuser);
        const hasilKomparasi = validate(hasil);
        expect(hasilKomparasi, 'validasi schema ajv ada yang salah').to.be.true;
    });

    it("READ - Get User Data Page 2", async function () { 
        const response = await fetch(`${baseURL}/api/users?page=2`, {
            method: "GET",
            headers: {
                "x-api-key": "reqres_6c6479c439a948c781704b147254d732"
            }
        });

        expect(response.status, 'status code tidak sesuai').to.equal(200); 

        const hasil = await response.json();

        expect(hasil.page, 'page tidak sesuai').to.equal(2);
        expect(hasil.data, 'data kosong').to.be.an('array').that.is.not.empty;

        const ajv = new Ajv();
        const validate = ajv.compile(schema_getuser); 
        const hasilKomparasi = validate(hasil);
        expect(hasilKomparasi, 'validasi schema ajv ada yang salah').to.be.true;
    });
});