import requiredAllAuth from '../components/hocs/AllAuth'
import Layout from '../layout'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Position from '../pages/Position'
import Department from '../pages/Department'
import Model from '../pages/Model'

import Machine from '../pages/Machine'
import CreateMachine from '../pages/Machine/create'
import MachineView from '../pages/Machine/view'
import EditMachine from '../pages/Machine/edit'

import Employee from '../pages/Employee'
import EmployeeTwo from '../pages/Employee/index_two'
import EmpDetail from '../pages/Employee/view'
import EmpEdit from '../pages/Employee/edit'

import Notfound from '../pages/Notfound'
import Assign from '../pages/Assign'

import Schedule from '../pages/Schedule'

import Profile from '../pages/Profile'
import Module from '../pages/Module'
import createModule from '../pages/Module/create'
import viewModule from '../pages/Module/view'
import editModule from '../pages/Module/edit'
import User from '../pages/User'
import CreateUser from '../pages/User/create'
import ViewUser from '../pages/User/view'
import EditUser from '../pages/User/edit'
import TND from '../pages/termandcondition'
import Complain from '../pages/Complain'
import ComplainCreate from '../pages/Complain/create'
import ComplainEdit from '../pages/Complain/edit'
import ComplainView from '../pages/Complain/view'
import AssignView from '../pages/Assign/view'
import accept from '../pages/Assign/accept'
import MachineHistoryView from '../pages/Assign/mv'
import Profiles from '../pages/Assign/profile'
import ViewSchedule from '../pages/Schedule/view'
import EditSchedule from '../pages/Schedule/edit'
import Job from '../pages/Job'
import View from '../pages/Job/View'
import Views from '../pages/Job/Views'
import machineview1 from '../pages/Job/mv1'
import machineview from '../pages/Job/mv'
import DailyReport from '../pages/DailyReport'
import dailyreportcreate from '../pages/DailyReport/dailyreportcreate'
import dailyreportview from '../pages/DailyReport/dailyreportview'
import servicereport from '../pages/Service Report'
import servicereportview from '../pages/Service Report/view'
import Cpl from '../pages/CPL'
import CustomerCreate from '../pages/CPL/create'
import Role from '../pages/Role'
import CustomerEdit from '../pages/CPL/edit'
import CustomerView from '../pages/CPL/view'
import UserRole from '../pages/UserRole'
import CreateUserRole from '../pages/UserRole/create'
import rolepermission from '../pages/Role/rolepermission'
import Onlinecomplain from '../pages/Onlinecomplain'

export default [
	{
		component: Layout,
		routes: [
			{
				component: requiredAllAuth(Dashboard),
				path: '/',
				exact: true
			},
			{
				component: requiredAllAuth(Onlinecomplain),
				path: '/onlinecomplain',
				exact: true
			},
			{
				component: requiredAllAuth(TND),
				path: '/tnd',
				exact: true
			},
			{
				component: requiredAllAuth(UserRole),
				path: '/userrole',
				exact: true
			},
			{
				component: requiredAllAuth(CreateUserRole),
				path: '/userrole/create',
				exact: true
			},

			{
				component: requiredAllAuth(Position),
				path: '/positions',
				exact: true
			},
			{
				component: requiredAllAuth(Role),
				path: '/role',
				exact: true
			},
			{
				component: requiredAllAuth(rolepermission),
				path: '/role/RP',
				exact: true
			},
			{
				component: requiredAllAuth(User),
				path: '/user',
				exact: true
			},
			{
				component: requiredAllAuth(CreateUser),
				path: '/user/create',
				exact: true
			},
			{
				component: requiredAllAuth(ViewUser),
				path: '/user/view/:id',
				exact: true
			},
			{
				component: requiredAllAuth(EditUser),
				path: '/user/edit/:id',
				exact: true
			},
			{
				component: requiredAllAuth(Department),
				path: '/departments',
				exact: true
			},
			{
				component: requiredAllAuth(Module),
				path: '/module',
				exact: true
			},

			{
				component: requiredAllAuth(Model),
				path: '/models',
				exact: true
			},

			{
				component: requiredAllAuth(createModule),
				path: '/module/create',
				exact: true
			},
			{
				component: requiredAllAuth(viewModule),
				path: '/module/view/:id',
				exact: true
			},
			{
				component: requiredAllAuth(editModule),
				path: '/module/edit/:id',
				exact: true
			},

			{
				component: requiredAllAuth(Machine),
				path: '/machine',
				exact: true
			},
			{
				component: requiredAllAuth(CreateMachine),
				path: '/machine/create',
				exact: true
			},
			{
				component: requiredAllAuth(MachineView),
				path: '/machine/view/:id',
				exact: true
			},
			{
				component: requiredAllAuth(EditMachine),
				path: '/machine/edit/:id',
				exact: true
			},
			/*  {
                  component: requiredAllAuth(MachineCreate),
                  path: '/machine/create',
                  exact : true
              }, */
			{
				component: requiredAllAuth(Employee),
				path: '/employee',
				exact: true
			},
			{
				component: requiredAllAuth(EmployeeTwo),
				path: '/employee/index_two',
				exact: true
			},
			{
				component: requiredAllAuth(EmpDetail),
				path: '/employees/view/:id',
				exact: true
			},
			{
				component: requiredAllAuth(EmpEdit),
				path: '/employees/edit/:id',
				exact: true
			},
			{
				component: requiredAllAuth(Complain),
				path: '/complains',
				exact: true
			},
			{
				component: requiredAllAuth(ComplainCreate),
				path: '/complains/create',
				exact: true
			},

			{
				component: requiredAllAuth(ComplainView),
				path: '/complains/view/:id',
				exact: true
			},

			{
				component: requiredAllAuth(ComplainEdit),
				path: '/complains/edit/:id',
				exact: true
			},
			{
				component: requiredAllAuth(Assign),
				path: '/assign',
				exact: true
			},
			{
				component: requiredAllAuth(AssignView),
				path: '/assign/view/:id',
				exact: true
			},
			{
				component: requiredAllAuth(accept),
				path: '/assign/accept/:id',
				exact: true
			},
			{
				component: requiredAllAuth(MachineHistoryView),
				path: '/assign/mv/:id',
				exact: true
			},
			{
				component: requiredAllAuth(Profiles),
				path: '/assign/profile/:id',
				exact: true
			},
			{
				component: requiredAllAuth(ViewSchedule),
				path: '/schedule/view/:id',
				exact: true
			},
			{
				component: requiredAllAuth(EditSchedule),
				path: '/schecule/edit/:id',
				exact: true
			},

			{
				component: requiredAllAuth(Schedule),
				path: '/schedule',
				exact: true
			},
			{
				component: requiredAllAuth(Cpl),
				path: '/Customer Payment Lists',
				exact: true
			},
			{
				component: requiredAllAuth(CustomerCreate),
				path: '/cpls/create',
				exact: true
			},
			{
				component: requiredAllAuth(CustomerView),
				path: '/cpls/view/:id',
				exact: true
			},
			{
				component: requiredAllAuth(CustomerEdit),
				path: '/cpls/edit/:id',
				exact: true
			},

			{
				component: requiredAllAuth(DailyReport),
				path: '/dailyreport',
				exact: true
			},
			{
				component: requiredAllAuth(dailyreportcreate),
				path: '/dailyreportcreate',
				exact: true
			},
			{
				component: requiredAllAuth(dailyreportview),
				path: '/dailyreport/dailyreportview/:id',
				exact: true
			},
			{
				component: requiredAllAuth(servicereport),
				path: '/servicereport',
				exact: true
			},
			{
				component: requiredAllAuth(servicereportview),
				path: '/servicereport/servicereportview/:id',
				exact: true
			},
			{
				component: requiredAllAuth(Job),
				path: '/job',
				exact: true
			},
			{
				component: requiredAllAuth(View),
				path: '/job/View/:id',
				exact: true
			},
			{
				component: requiredAllAuth(Views),
				path: '/job/Views/:id',
				exact: true
			},
			{
				component: requiredAllAuth(machineview1),
				path: '/Job/mv1/:id',
				exact: true
			},
			{
				component: requiredAllAuth(machineview),
				path: '/Job/mv/:id',
				exact: true
			},

			{
				component: requiredAllAuth(Profile),
				path: '/profile',
				exact: true
			},

			{
				component: Login,
				path: '/login'
			},
			{
				component: Notfound
			}
		]
	}
]
