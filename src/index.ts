import { BizRecord, Config, ObjectMeta, ObjectMetaDetail, QueryOptions, QueryResult } from './types';
import { AuthService } from './auth';
import { ObjectService } from './object';
import { DataService } from './data';

export default class HClient {
    private authService: AuthService;
    private objectService: ObjectService;
    private dataService: DataService;

    config = {
        pageSize: 10,
    };

    constructor(config: Config) {
        this.authService = new AuthService(config);
        this.objectService = new ObjectService(this.authService);
        this.dataService = new DataService(this.authService);
    }

    /**
     * 获取业务对象列表
     * @returns ObjectMeta[]
     */
    public async getObjects(): Promise<ObjectMeta[]> {
        return this.objectService.getObjects();
    }

    /**
     * 获取业务对象描述
     * @param metaName 业务对象api名称
     * @returns ObjectMetaDetail
     */
    public async getObjectDescription(metaName: string): Promise<ObjectMetaDetail> {
        return this.objectService.getObjectDescription(metaName);
    }

    /**
     * 获取业务类型
     * @param metaName 业务对象api名称
     * @param data 业务数据，字段apiName: value 格式 {fieldName: 'fieldValue'}
     * @returns 创建的业务数据code
     */
    public async createData(metaName: string, data: BizRecord): Promise<string> {
        return this.dataService.createData(metaName, data);
    }

    /**
     * 更新业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @param data 字段数据 {fieldName: 'fieldValue'}
     * @returns 更新的业务数据code
     * @throws Error 更新业务数据失败
     */
    public async updateData(metaName: string, code: string, data: BizRecord): Promise<string> {
        return this.dataService.updateData(metaName, code, data);
    }

    /**
     * 批量新增业务数据
     * @param metaName 业务对象api名称
     * @param records 业务数据数组，最多30条
     * @returns 创建的业务数据code数组
     */
    public async batchCreateData(metaName: string, records: BizRecord[]): Promise<string[]> {
        return this.dataService.batchCreateData(metaName, records);
    }

    /**
     * 删除业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @returns 删除的业务数据code
     */
    public async deleteData(metaName: string, code: string): Promise<string> {
        return this.dataService.deleteData(metaName, code);
    }

    /**
     * 批量更新业务数据
     * @param metaName 业务对象api名称
     * @param records 业务数据数组，最多30条，每条必须包含code字段
     * @returns 更新的业务数据code数组
     */
    public async batchUpdateData(metaName: string, records: BizRecord[]): Promise<string[]> {
        return this.dataService.batchUpdateData(metaName, records);
    }

    /**
     * 获取业务数据
     * @param metaName 业务对象api名称
     * @param code 业务数据code
     * @returns 业务数据
     */
    public async getData(metaName: string, code: string): Promise<BizRecord> {
        return this.dataService.getData(metaName, code);
    }

    /**
     * 查询业务数据
     * @param metaName 业务对象api名称
     * @param selectFields 要查询的字段列表
     * @param pageNo 页码，从1开始，不传则默认为1
     * @param pageSize 每页大小，不传则默认为10
     * @param query 查询条件，格式为 {fieldName: value}
     * @returns 业务数据列表
     */
    public async queryData(metaName: string, options: QueryOptions): Promise<QueryResult> {
        return this.dataService.queryData(metaName, options);
    }

    /**
     * 查询业务数据
     * @param sql 查询语句，支持where、order by、limit、offset等
     * @returns 业务数据列表
     */
    public async queryDataBySQL(sql: string) {
        return this.dataService.queryDataBySQL(sql);
    }

    /**
     * 查询辅助或内置对象业务数据
     * @param metaName 业务对象api名称
     * @param selectFields 要查询的字段列表
     * @param pageNo 页码，从1开始，不传则默认为1
     * @param pageSize 每页大小，不传则默认为10
     * @param query 查询条件，格式为 {fieldName: value}
     * @returns 业务数据列表
     */
    public async queryAuxiliaryData(metaName: string, options: QueryOptions): Promise<QueryResult> {
        return this.dataService.queryAuxiliaryData(metaName, options);
    }

    /**
     * 业务数据转移负责人
     * @param metaName 业务对象的metaName
     * @param code 数据code
     * @param newOwner 新负责人code
     * @param addTeam 是否添加当前负责人为跟进人 (0 否 1 是)
     * @param deptFollowNewOwner 所属部门是否和新负责人保持一致 (0 否 1 是)
     * @returns 转移后的业务数据code
     */
    public async transferOwner(
        metaName: string,
        code: string,
        newOwner: string,
        addTeam: boolean,
        deptFollowNewOwner: boolean
    ): Promise<string> {
        return this.dataService.transferOwner(metaName, code, newOwner, addTeam, deptFollowNewOwner);
    }
}
