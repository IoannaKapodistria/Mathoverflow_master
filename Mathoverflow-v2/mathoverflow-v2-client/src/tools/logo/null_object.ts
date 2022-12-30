export type nullObject = { nullProp: null };
export function isNullObject(value: any): value is nullObject {
    if (!value) return false;
    if (value.nullProp !== null) return false;
    return true;
}
export const nullObjectConst: nullObject = { nullProp: null };
