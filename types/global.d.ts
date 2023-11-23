declare global{

    /**
     * 网签对象
     */
    interface TagView {
        
        // 网签名称
        name: string;

        // 网签标题
        title: string;

        // 页签路由路径
        path: string;

        // 页签路由完整路径
        fullPath: string;

        // 页签图标
        icon?: string;

        // 是否固定标签
        affix: boolean;

        // 是否开启缓存
        keepAlibe: boolean;

        // 路由查询参数
        query?: any;
    }


    /**
     * 系统设置
     */
    interface AppSettings {

        // 系统标题
        title: string;
    
        // 系统版本
        version: string;
    
        // 是否显示设置
        showSettings: boolean;
    
        // 是否显示多标签导航
        tagsView: boolean;
    
        // 是否固定头部
        fixedHeader: boolean;
    
        // 是否显示侧边栏Logo
        sidebarLogo: boolean;
    
        // 导航栏布局(left|top|mix)
        layout: string;
    
        // 主题模式(dark|light)
        theme: string;
    
        // 布局大小(default| large|small)
        size: string;
    
        // 语言(zh-cn | en)
        language: string;
    
        // 主题颜色
        themeColor: string;
    
        // 水印配置
        watermark: {
            // 是否开启水印
            enable: boolean;
            // 水印内容
            content: string;
        }
    
    }


    /**
     * 组件数据源
     */
    interface OptionType {

        // 值
        value: string | number;
        
        // 文本
        label: string;

        // 子列表
        children?: OptionType[];
    }


}

export {}