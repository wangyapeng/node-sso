import { User } from "../entity/user";
import { AppDataSource } from "../controller";
import { Tenant } from "../entity/tenant";
import { createQueryBuilder } from "typeorm";

class UserService  {
    public static async requestUserInfo(id: any) {
        const userRepository = AppDataSource.getRepository(User);
        const tenantRepository = AppDataSource.getRepository(Tenant);

        try {
            var userInfo = await userRepository.findOneBy({id: id});
            const tenant = await tenantRepository.createQueryBuilder()
            .leftJoinAndSelect('user','user',`user.id=${id}`)
            .getMany();

            delete userInfo['password'];

            //@ts-ignore
            userInfo["tenants"] = tenant
            return userInfo;
        } catch(e) {
            console.error(e)
            return false;
        }
    }
}

export default UserService