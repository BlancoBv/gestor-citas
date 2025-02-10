export default class VerifyPath {
  private url: string;
  private method: string;
  private search: string;

  private protectedRoutes: {
    path: string;
    method: string[];
    bypass?: RegExp[];
  }[] = [
    { path: "panel", method: ["GET", "POST", "PUT", "DELETE"] },
    { path: "api/login", method: ["GET", "DELETE", "PUT"] },
    {
      path: "api/citas",
      method: ["POST", "DELETE", "GET", "PUT"],
      bypass: [/[?]estatus=\w+/],
    },
    {
      path: "api/citas-abiertas",
      method: ["GET", "POST", "PUT", "DELETE"],
      bypass: [/[?]fecha=\w+-\w+-\w+/],
    },
    /* {
      path: "api/articulos",
      method: ["POST", "DELETE", "PUT"],
    },
    { path: "api/user", method: ["POST", "PUT", "DELETE", "GET"] },
    {
      path: "api/roles",
      method: ["POST", "DELETE", "PUT", "GET"],
    },
    {
      path: "api/etiquetas",
      method: ["POST", "DELETE", "PUT", "GET"],
      bypass: [
        /[?&]idetiqueta=\w+&includeBlogs=true(?:&|$)/,
        /[?&]idetiqueta=\w+&includeArticulos=true(?:&|$)/,
      ],
    },
    {
      path: "api/miembros",
      method: ["POST", "DELETE", "PUT", "GET"],
      bypass: [
        /[?]idmiembro=\w+&includeProyectos=true&includePublicaciones=true/,
        /[?]colaborador=(false|true)(?:&|$)/,
      ],
    },
    {
      path: "api/banners",
      method: ["POST", "DELETE", "PUT", "GET"],
      bypass: [/[?&]mostrar=true(?:&|$)/],
    },
    {
      path: "api/minutas",
      method: ["POST", "DELETE", "PUT"],
    },
    {
      path: "api/proyectos",
      method: ["POST", "DELETE", "PUT"],
    },
    {
      path: "api/publicaciones",
      method: ["POST", "DELETE", "PUT"],
    },
    {
      path: "api/logs",
      method: ["POST", "DELETE", "PUT", "GET"],
    },
    {
      path: "api/permisos",
      method: ["POST", "DELETE", "PUT", "GET"],
    }, */
  ];

  constructor(url: string, method: string, search: string) {
    this.url = url;
    this.method = method;
    this.search = search;
  }

  private findMatch() {
    return this.protectedRoutes.some((el) => {
      const regExp = new RegExp(`^/?${el.path}(\\?.*)?$`);
      if (el.bypass) {
        const isBypass = el.bypass?.some((bypass) => {
          const regExp = new RegExp(bypass);
          return regExp.test(this.search);
        });

        if (isBypass) {
          return false;
        }
      }
      return regExp.test(this.url) && el.method.some((m) => m === this.method);
    });
  }

  public isProtected(): boolean {
    return this.findMatch();
  }

  public pathnameType() {
    const regExp = new RegExp(/\/api\//);
    if (regExp.test(this.url)) {
      return "api";
    }
    return "content";
  }
}
