import { User } from "../entity/user";
import { AppDataSource } from "../../dataSource";
import { Tenant } from "../entity/tenant";

class TenantService {

    public static async putTenantInfo(id: any, data: any, userId?:any) {
        const repository = AppDataSource.getRepository(Tenant);
        const userRepository = AppDataSource.getRepository(User);
        try {
            if (id) {
                var tenant = await repository.findOne(id) as any;
                if (tenant) {
                    Object.keys(data).forEach(k => tenant[k] = data[k])
                    const res = await repository.save(tenant);
                    return res;
                }
            } else {
                const tenant = new Tenant() as any;

                Object.keys(data).forEach(k => tenant[k] = data[k])
                const user = await userRepository.findOneBy({id: userId});
                if (!user) return false;
                tenant.users = [];
                tenant.users.push(user)
                const res = await repository.save(tenant);
                return res;
            }
        } catch(e) {
            console.error(e);
            throw Error(e);
        }
    }
}

export default TenantService;