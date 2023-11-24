import toast from "react-hot-toast";

export class Validation {
  value: any;
  errors: string[] = [];
  constructor(item: any) {
    this.value = item;
  }

  min = (v: number, m?: string) => {
    if (typeof this.value === "string") {
      if (this.value.trim().length < v) {
        this.errors = [...this.errors, m ?? `Le champ doit avoir un minimum de ${v} caractères !`];
      }
      return this;
    }
    if (typeof this.value === "number") {
      if (this.value < v) {
        this.errors = [...this.errors, m ?? `Le champ doit être supérieur à ${v - 1} !`];
        return this;
      }
    }
    return this;
  };
  max = (v: number, m?: string) => {
    if (typeof this.value === "string") {
      if (this.value.trim().length > v) {
        this.errors = [...this.errors, m ?? `Le champ doit avoir un maximum de ${v} caractères !`];
      }
      return this;
    }
    if (typeof this.value === "number") {
      if (this.value > v) {
        this.errors = [...this.errors, m ?? `Le champ doit être inférieur à ${v} !`];
      }
      return this;
    }
    return this;
  };
  enum = (v: string[], m?: string) => {
    if (typeof this.value === "string") {
      if (!v.includes(this.value)) {
        this.errors = [...this.errors, m ?? "Veuillez sélectionner une valeur !"];
      }
    }
    return this;
  };
  conditional = (v: boolean, m?: string) => {
    if (v) {
      if (typeof this.value === "string" && this.value.trim() === "") {
        this.errors = [...this.errors, m ?? "Ce champ nécessite une valeur !"];
        return this;
      }
      if (typeof this.value === "number" && this.value === 0) {
        this.errors = [...this.errors, m ?? "Ce champ nécessite une valeur !"];
        return this;
      }
      if (this.value === null) {
        this.errors = [...this.errors, m ?? "Ce champ nécessite une valeur !"];
        return this;
      }
      return this;
    }
    return this;
  };
  match = (v: string | RegExp, m?: string) => {
    if (typeof this.value === "string") {
      if (!this.value.match(v)) {
        this.errors = [...this.errors, m ?? "Le champ ne correspond pas à la valeur attendue !"];
        return this;
      }
    }
    return this;
  };
  alpha = (m?: string) => {
    if (typeof this.value === "string") {
      if (!this.value.match(/^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$/)) {
        this.errors = [...this.errors, m ?? "Le champ ne peut contenir que des lettres !"];
        return this;
      }
    }
    return this;
  };
  numeric = (m?: string) => {
    if (typeof this.value === "string") {
      if (!this.value.match(/^[0-9]+$/)) {
        this.errors = [...this.errors, m ?? "Le champ ne peut contenir que des chiffres !"];
        return this;
      }
    }
    return this;
  };
  email = (m?: string) => {
    if (typeof this.value === "string") {
      if (!this.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        this.errors = [...this.errors, m ?? "Le champ doit être un email valide !"];
        return this;
      }
    }
    return this;
  };
  phone = (m?: string) => {
    if (typeof this.value === "string") {
      if (!this.value.match(/^[0][1-9][0-9]{8}/)) {
        this.errors = [...this.errors, m ?? "Le champ doit être un numéro de téléphone valide !"];
        return this;
      }
      return this;
    }
    return this;
  };
  optional = (m?: string) => {
    if (typeof this.value === "string") {
      if (this.value === "") {
        this.errors = [];
        return this;
      }
    }
    if (typeof this.value === "number") {
      if (this.value === 0 || null) {
        this.errors = [];
        return this;
      }
    }
    return this;
  };
  required = (m?: string) => {
    if (this.value === null) {
      this.errors = [...this.errors, m ?? "Le champ ne peut pas être vide !"];
      return this;
    }
    return this;
  };

  validate = () => {
    return this.errors[0] ?? "";
  };
}

export const checkErrors = (errors: {}, handleError: () => void) => {
  if (Object.values(errors).some((error) => error !== "")) {
    toast.error("Veuillez corriger les erreurs !");
    handleError();
    return false;
  }
  return true;
};
