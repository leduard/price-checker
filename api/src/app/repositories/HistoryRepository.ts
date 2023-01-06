import dataSource from "dataSource";

import History from "@models/ProductHistory";

export const HistoryRepository = dataSource.getRepository(History).extend({});

export default HistoryRepository;
