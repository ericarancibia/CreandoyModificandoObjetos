function Paciente(nombre, edad, rut, diagnostico) {
    let _nombre = nombre;
    let _edad = edad;
    let _rut = rut;
    let _diagnostico = diagnostico;

    Object.defineProperty(this, "_getNombre", {
        get: function () {
            return _nombre
        }
    });

    Object.defineProperty(this, "_setNombre", {
        set: function (nombre) {
            _nombre = nombre
        }
    });

    Object.defineProperty(this, "_getEdad", {
        get: function () {
            return _edad
        }
    });

    Object.defineProperty(this, "_setEdad", {
        set: function (edad) {
            _edad = edad
        }
    });

    Object.defineProperty(this, "_getRUT", {
        get: function () {
            return _rut
        }
    });

    Object.defineProperty(this, "_getDiagnostico", {
        get: function () {
            return _diagnostico
        }
    });

    Object.defineProperty(this, "_setDiagnostico", {
        set: function (diagnostico) {
            _diagnostico = diagnostico
        }
    });
}

Paciente.prototype.getNombre = function () {
    return this._getNombre;
};

Paciente.prototype.setNombre = function (nombre) {
    this._setNombre = nombre;
};

Paciente.prototype.getEdad = function () {
    return this._getEdad;
};

Paciente.prototype.setEdad = function (edad) {
    this._setEdad = edad;
};

Paciente.prototype.getRUT = function () {
    return this._getRUT;
};

Paciente.prototype.getDiagnostico = function () {
    return this._getDiagnostico;
};

Paciente.prototype.setDiagnostico = function (diagnostico) {
    this._setDiagnostico = diagnostico;
};


function Consultorio(nombre, pacientes) {
    this.nombre = nombre;
    this.pacientes = pacientes || [];
}

Consultorio.prototype.agregarPaciente = function (paciente) {
    this.pacientes.push(paciente);
}

Consultorio.prototype.buscarPaciente = function (nombrePaciente) {
    document.getElementById('cuerpo-tabla-busquedaNombre').innerHTML = "";
    document.getElementById("tableBusqueda").className = "table table-striped table-hover d-none";
    this.pacientes.forEach(element => {
        if (element.getNombre().toLowerCase() == nombrePaciente.toLowerCase()) {
            document.getElementById("tableBusqueda").className = "table table-striped table-hover";
            document.getElementById('cuerpo-tabla-busquedaNombre').innerHTML += `
                <tr>
                    <td>${element.getNombre()}</td>
                    <td>${element.getEdad()}</td>
                    <td>${element.getRUT()}</td>
                    <td>${element.getDiagnostico()}</td>
                </tr> `;
        }
    });
}

Consultorio.prototype.buscarPorRUT = function (rutPaciente) {
    document.getElementById('cuerpo-tabla-busquedaRUT').innerHTML = "";
    document.getElementById("tableBusquedaRUT").className = "table table-striped table-hover d-none";
    this.pacientes.forEach(element => {
        if (element.getRUT() == rutPaciente) {
            document.getElementById("tableBusquedaRUT").className = "table table-striped table-hover";
            document.getElementById('cuerpo-tabla-busquedaRUT').innerHTML += `
                <tr>
                    <td>${element.getNombre()}</td>
                    <td>${element.getEdad()}</td>
                    <td>${element.getRUT()}</td>
                    <td>${element.getDiagnostico()}</td>
                </tr> `;

            let modifyForm = document.getElementById('modifyForm');
            modifyForm.elements['nombreNuevo'].value = element.getNombre();
            modifyForm.elements['edadNuevo'].value = element.getEdad();
            modifyForm.elements['rutNuevo'].value = element.getRUT();
            modifyForm.elements['diagNuevo'].value = element.getDiagnostico();
        }
    });
}

Consultorio.prototype.modificarPorRUT = function (nombre, edad, rut, diagnostico) {
    this.pacientes.forEach(element => {
        if (element.getRUT() == rut) {
            element.setNombre(nombre);
            element.setEdad(edad);
            element.setDiagnostico(diagnostico);
        }
    });
}

Consultorio.prototype.listarPacientes = function () {
    document.getElementById('cuerpo-tabla-listadoPacientes').innerHTML = "";
    this.pacientes.forEach(element => {
        document.getElementById('cuerpo-tabla-listadoPacientes').innerHTML += `
            <tr>
                <td>${element.getNombre()}</td>
                <td>${element.getEdad()}</td>
                <td>${element.getRUT()}</td>
                <td>${element.getDiagnostico()}</td>
            </tr> `;
    });
}

let p1 = new Paciente('Fabian Pena', 35, '17329934-3', 'Síndrome de Witzelsucht');
let p2 = new Paciente('Alejandra Valencia', 36, '16998432-2', 'Síndrome de Tourette');
let p3 = new Paciente('Eric Arancibia', 40, '15065490-4', 'Meteorismo Apocalíptico');

let c1 = new Consultorio('- Centro Médico "El Lujo" -', [p1, p2, p3]);

document.getElementById("nombre-consultorio").innerHTML = c1.nombre;

c1.listarPacientes();

const formBusqueda = document.getElementById('searchForm');
formBusqueda.addEventListener('submit', (event) => {
    event.preventDefault();

    let pacienteBuscar = document.getElementById('nombreBuscar').value;
    c1.buscarPaciente(pacienteBuscar);
});

const formBusquedaRUT = document.getElementById('searchRUTForm');
formBusquedaRUT.addEventListener('submit', (event) => {
    event.preventDefault();

    let rutBuscar = document.getElementById('rutBuscar').value;
    c1.buscarPorRUT(rutBuscar);
});

const formIngreso = document.getElementById('inputForm');
formIngreso.addEventListener('submit', (event) => {
    event.preventDefault();

    let nombreNuevo = formIngreso.elements['nombreNuevo'].value;
    let edadNuevo = formIngreso.elements['edadNuevo'].value;
    let rutNuevo = formIngreso.elements['rutNuevo'].value;
    let diagNuevo = formIngreso.elements['diagNuevo'].value;

    let pN = new Paciente(nombreNuevo, edadNuevo, rutNuevo, diagNuevo);
    c1.agregarPaciente(pN);
    c1.listarPacientes();

    formIngreso.reset();
});

const modifyForm = document.getElementById('modifyForm');
modifyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let nombreNuevo = modifyForm.elements['nombreNuevo'].value;
    let edadNuevo = modifyForm.elements['edadNuevo'].value;
    let rut = modifyForm.elements['rutNuevo'].value;
    let diagNuevo = modifyForm.elements['diagNuevo'].value;

    c1.modificarPorRUT(nombreNuevo, edadNuevo, rut, diagNuevo);
    c1.listarPacientes();

    modifyForm.reset();
});

