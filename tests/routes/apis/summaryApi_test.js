import { superoak } from '../../../deps.js';
import app from '../../../app.js';

Deno.test({
    name: "GET request to /api/summary should return respond with 200 and content-type is application/json", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/summary")
            .expect(200)
            .expect('Content-Type', new RegExp('application/json'));
    }, 
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET request to /api/summary/2022/12/21 should return respond with 200 and content-type is application/json", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/summary/2022/12/21")
            .expect(200)
            .expect('Content-Type', new RegExp('application/json'))
            .expect({});
    }, 
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET request to /api/summary/20222/12/21 should return respond with 404, content-type is application/json and error message for year", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/summary/20222/12/21")
            .expect(404)
            .expect('Content-Type', new RegExp('application/json'))
            .expect({
                "year": {
                    "match": "year format is incorrect"
                }
            });
    }, 
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET request to /api/summary/2022/121/21 should return respond with 404, content-type is application/json and error message for month", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/summary/2022/121/21")
            .expect(404)
            .expect('Content-Type', new RegExp('application/json'))
            .expect({
                "month": {
                    "match": "month format is incorrect"
                }
            });
    }, 
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET request to /api/summary/2022/12/211 should return respond with 404, content-type is application/json and error message for day", 
    async fn() {
        const testClient = await superoak(app);
        await testClient.get("/api/summary/2022/12/211")
            .expect(404)
            .expect('Content-Type', new RegExp('application/json'))
            .expect({
                "day": {
                    "match": "day format is incorrect"
                }
            });
    }, 
    sanitizeResources: false,
    sanitizeOps: false
});