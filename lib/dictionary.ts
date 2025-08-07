export type Dictionary = {
  home: {
    poweredByAIMatching: string;
  };
};

// 2. "Магический" тип для создания всех возможных путей к ключам
export type ObjectPaths<T extends object> = {
  [K in keyof T]: K extends string ? (T[K] extends object ? `${K}` | `${K}.${ObjectPaths<T[K]>}` : `${K}`) : never;
}[keyof T];
