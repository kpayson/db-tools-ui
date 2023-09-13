import { Component } from '@angular/core';
import { DbToolsService } from '../db-tools.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs';

@Component({
  selector: 'app-db-seeder',
  templateUrl: './db-seeder.component.html',
  styleUrls: ['./db-seeder.component.scss'],
  providers: [MessageService]
})
export class DbSeederComponent {

  constructor(private toolsService: DbToolsService, private messageService: MessageService) { }

  seedCountsText = '';

  definedSeedEntities = `Client, Group, GroupRole, IdentityProvider, Namespace, Permission, Role, RolePermission, Tenant, TenantUser, User`;

  seedClick() {
    const rows = this.seedCountsText.split('\n');
    const tableCounts: { [tableName: string]: number } = rows.reduce((acc, r) => {
      const indexOfFirstSpace = r.search(/\s/);
      const table = r.substring(0, indexOfFirstSpace);
      const count = Number(r.substring(indexOfFirstSpace + 1));
      return { ...acc, [table]: count }
    }, {});
    this.toolsService.seedDB(tableCounts);
    this.toolsService.dataChangeNotice$.pipe(first()).subscribe(()=>{
      this.messageService.add({ severity: 'success', summary: 'Seed Complete', detail:''});
    })
  }
}
