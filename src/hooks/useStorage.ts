import { WeatherLocation } from "@/api/models";
import { LocalStorageManager } from "@/api/storage";
import { Ref, ref } from "vue";

export default function useStorage<T extends WeatherLocation>() {
  const lm = new LocalStorageManager<T>();
  const data = ref<T[]>([]) as Ref<T[]>;

  data.value = lm.readData();

  const add = (item: T | Array<T>) => {
    const newData = item instanceof Array ? item : [item];
    data.value = data.value instanceof Array ? [...data.value, ...newData] : newData;
    save();
  };

  const save = () => {
    lm.saveData(data.value);
  };

  const remove = (item: T) => {
    if (data.value instanceof Array) {
      data.value = data.value.filter(
        (dataItem) => dataItem.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase()
      );
    }
    save();
  };

  const clear = () => {
    data.value = [];
    save;
  };

  return {
    data,
    actions: {
      add,
      remove,
      clear,
    },
  };
}
