import { App } from "../entity/app";
import { AppDataSource } from "../controller";
import { Order, OrderType } from "../entity/order";


class OrderService {

    public static async createTrialOrder(params: any) {
        const { userId, tenantId, appId} = params;
        const orderRepository = AppDataSource.getRepository(Order);
        const order = new Order();

        const egisitOrder = await orderRepository.findOneBy({
            userId,
            tenantId
        })

        if (egisitOrder) {
            return false
        }

        const appRepository = AppDataSource.getRepository(App);
        const app = await appRepository.findOneBy({id: Number(appId)});

        order.id = Date.now() + "";
        order.userId = userId;
        order.tenantId = tenantId;
        order.amount = 498;
        order.price = 498;
        order.productName = app.name,
        order.orderType = OrderType.TrialOrder;
        order.productAppKey = app.value;
        order.detail = 100;
        order.orderSn = `100`;

        const res = await orderRepository.save(order);
        return res;
    }


}


export default OrderService;