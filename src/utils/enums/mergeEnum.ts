
export function mergeEnum(...enums: any[]) {
    const merged = [];

    for (const e in enums) {
        Object.assign(merged, e);
    }

    return merged;
}


// export type MergedEnums<T> = T & T;

// class A{}

// export const a: MergedEnums<A> = new A;
