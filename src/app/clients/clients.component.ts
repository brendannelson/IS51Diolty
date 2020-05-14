import { Component, OnInit } from '@angular/core';
import { Clients } from './clients.model';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../localStorageService';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../login/login.component';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  toastTypes: Array<string> = [];
  clients: Array<Clients> = [];
  clientsParams: string;
  localStorageService: LocalStorageService<Clients>;
  currentUser: IUser;


  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toasteService: ToastService
  ) {
    this.localStorageService = new LocalStorageService('clients');
  }

  async ngOnInit() {
    const currentUser = this.localStorageService.getItemsFromLocalStorage('user');
    if (currentUser == null) {
      this.router.navigate(['']);
    }
    this.loadClients();
    this.activatedRoute.params.subscribe((data: IUser) => {
    this.currentUser = data;
    });
  }

  async loadClients() {
    const savedClients = this.getItemsFromLocalStorage('clients');
    if (savedClients && savedClients.length > 0) {
      this.clients = savedClients;
    } else {
      this.clients = await this.loadItemsFromFile();
    }
    this.sortByID(this.clients);
  }

  async loadItemsFromFile() {
    const data: any = await this.http.get('assets/clients.json').toPromise();

    return data;
  }

  addClient() {
    this.clients.unshift(new Clients({
      id: null,
      firstName: null,
      lastName: null,
      phone: null,
      email: null
    }));
  }

  deleteclients(index: number) {
    this.clients.splice(index, 1);
    this.saveItemsToLocalStorage(this.clients);
  }

  saveclients(clients: any) {
    let hasError = false;
    Object.keys(clients).forEach((key: any) => {
      if (clients[key] == null) {
        hasError = true;
        this.toasteService.showToast('danger', `Save failed! ${key} cannot not be empty!`, 2000);
      }
    });
    if (!hasError) {
      clients.editing = false;
      this.saveItemsToLocalStorage(this.clients);

    }
  }

  saveItemsToLocalStorage(clients: Array<Clients>) {
    clients = this.sortByID(clients);
    return this.localStorageService.saveItemsToLocalStorage(clients);
  }

  getItemsFromLocalStorage(key: string) {
    // const savedclients = JSON.parse(localStorage.getItem(key));
    return this.localStorageService.getItemsFromLocalStorage();

  }

  searchclients(params: string) {
    this.clients = this.clients.filter((item: Clients) => {
      const fullName = item.firstName + ' ' + item.lastName;
      if (params === fullName || params === item.lastName || params === item.firstName) {
        return true;
      } else {
        return false;
      }
    });

  }
  sortByID(clients: Array<Clients>) {
    clients.sort((prevclients: Clients, presclients: Clients) => {
      return prevclients.id > presclients.id ? 1 : -1;
    });
    return clients;
  }

  logout() {
    this.localStorageService.clearItemsFromLocalStorage('user');
    this.router.navigate(['']);
  }

  showToast() {
    const rand = Math.floor(Math.random() * 4);
    this.toasteService.showToast('success', `Created by Brendan Nelson, Vanessa Elizondo & Nareg Apkarian (c).` + rand, 80000);
  }

}
