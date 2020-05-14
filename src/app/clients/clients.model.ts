interface Iclients {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    editing?: boolean;
}

export class Clients {
    public id?: number;
    public firstName?: string;
    public lastName?: string;
    public email?: string;
    public phone?: string;
    public editing?: boolean;

    constructor(clients: Iclients) {
        clients.editing = this.setState(clients);
        Object.assign(this, clients);
    }

    setState(clients: Iclients) {

        if (clients == null || Object.keys(clients).length == 0) {
            return true;

        }



        let editing = false;
        Object.keys(clients).forEach((key) => {
            if (clients[key] == null) {
                editing = true;
            }

        });

        return editing;
    }

}