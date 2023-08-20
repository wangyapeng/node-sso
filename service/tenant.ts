import { AppDataSource } from "../controller";
import { Tenant } from "../entity/tenant";

class TenantService {

    public static async putTenantInfo(id: any, data: any) {
        const repository = AppDataSource.getRepository(Tenant);
        if (id) {
            var tenant = repository.findOne(id);
            tenant = data;
            return tenant;
        } else {
            const tenant = new Tenant();

            //@ts-ignore
            Object.keys(data).forEach(k => tenant[k] = data[k])
            const res = await repository.save(tenant);
            return res;
        }
    }
}

export default TenantService;