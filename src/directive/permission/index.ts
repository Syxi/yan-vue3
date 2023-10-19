import { useUserStoreHook } from "@/store/user";
import { Directive, DirectiveBinding } from "vue"


// 按钮权限
export const hasPerm: Directive = {
    mounted(el: HTMLElement, binging: DirectiveBinding) {
        // 超级管理员拥有所有的按钮权限
        const { roles, perms } = useUserStoreHook().user;
        if (roles.includes("admin")) {
            return true;
        }
        // 其他角色按钮权限校验
        const { value } = binging;
        if (value) {
            // DOM绑定需要的按钮权限标识
            const requiredPerms = value;
            const hasPerm = perms?.some((perm) => {
                return requiredPerms.includes(perm);
            });

            if (!hasPerm) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error("need perms! like v-hasPerm=\"['sys:user:add']\"");
        }
    }
}


// 角色权限
export const hasRole: Directive = {
    mounted(el: HTMLElement, binging: DirectiveBinding) {
        const  { value } = binging;

        if (value) {
            // DOM绑定需要的角色编码
            const requiredRoles = value;
            const { roles } = useUserStoreHook().user;
            const hasRole = roles.some((perm) => {
                return requiredRoles.includes(perm);
            });

            if (!hasRole) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error("need roles! like v-role=\"['admin', 'test']\"");
        }
    }
}