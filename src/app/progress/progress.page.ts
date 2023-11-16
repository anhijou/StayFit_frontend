import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ProgressService } from '../services/progress.service';
import { progress } from 'src/interfaces/progress.interface';
import Swiper from 'swiper';
import { DatePipe } from '@angular/common';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { userData } from 'src/interfaces/userData';
import { FormBuilder } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';
import { FormService } from '../services/form.service';
import { GoalsService } from '../services/goals.service';
import { Goal } from 'src/interfaces/goal.interface';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit, AfterViewInit {
  @ViewChild('lineCanvas')
  private lineCanvas!: ElementRef;
  weightbinding!: number;
  iduser !: any;
  lineChart: any;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  lastProgress: any;
  current_weight: any;
  target_weight: any;
  isLoadingData: boolean = false;
  datauser: GetDataUser = {
    profile_image: null,
    data: undefined,
    id: 0,
    name: '',
    email: '',
    gender: null,
    form_status: 0,
    date_of_birth: null,
    role_id: 0,
    current_height: null,
    current_weight: null,
    phone: null,
    goal_id: null,
    target_weight: null,
    goal_status: null,
    created_at: '',
    updated_at: '',
    deleted_at: null,
    password: null,
    profileImagePath: null
  };
  showSuccessAlert: boolean = false;
  isLoadingwieght = true;
  isLoadingCanvas = true;
  isModalOpen = false;
  isModalOpenchangeGoal = false;
  alertSuccessMessage = false;
  pageCondition1 = false;
  TitleGoal !: any;
  userData: any;
  goals!: Goal[];
  journalData: any[] = [];
  journalDataAll: any[] = [];
  journalDatachart: any[] = [];
  newGoal !: any;
  titleGoalName !: string;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  public alertButtons = [
    {
      text: 'OK',
      handler: (weight: string) => {
        const parsedWeight = parseFloat(weight[0]); // Access the value from the : Object { 0: "12" }
        console.log('Parsed weight:', parsedWeight);
        if (parsedWeight) {
          this.storeWeight(parsedWeight);
        }
        else {
          alert("Enter your Weight")
        }


      },
    },
  ];
  public alertInputs = [
    {
      type: 'number',
      placeholder: 'Weight',
      min: 1,
      max: 180,
      required: true,
    },

  ];

  constructor(private progservice: ProgressService, private datePipe: DatePipe,
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private formService: FormService,
    private goalService: GoalsService,
    private modalController: ModalController,
    private router: Router,
    private loadingService: LoadingService,
    private getdayauserservice: UserDataService) { }

  storeWeight(weight: number) {

    this.iduser = localStorage.getItem('iduser');

    const progressData: progress = {

      user_id: this.iduser, // Update with the appropriate user ID
      weight: weight,
      created_at: '',
      updated_at: '',
    };

    this.progservice.ProgressAdd(progressData).subscribe(
      (response: any) => {
        localStorage.setItem('userData', JSON.stringify(response.data));
        this.loaddata();
        console.log('Weight stored successfully');
        // Handle any further actions or notifications on successful weight storage
      },
      (error) => {
        console.error('Failed to store weight', error);
        // Handle error scenario
      }
    );
    this.getProgess();
  }

  reload_userdata() {


    this.getdayauserservice.GetData().subscribe(
      async (response: any) => {
        localStorage.setItem('userData', JSON.stringify(response.data));
        await this.loaddata();
        await this.lineChartMethod();
        // Handle any further actions or notifications on successful weight storage
      },
      (error) => {
        // Handle error scenario
      }
    );
  }

  getProgess() {
    this.isLoadingData = true;
    this.progservice.GetAll().subscribe(async (response: any) => {

      // Assuming the response is an array of progress entries
      const progresslist = response.data;
      this.journalDataAll = progresslist;
      await this.lineChartMethod();
      // Get the last three entries from the array and reverse the order
      const lastThreeProgress = progresslist.slice(-3).reverse();
      const lasttenProgress = progresslist.slice(-7).reverse();
      this.journalDatachart = lasttenProgress;
      this.journalData = lastThreeProgress;
      // Store the last three reversed entries in the journalData variable
      this.isLoadingData = false;


    });
  }

  async ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // await this.getProgess();
    //await this.loaddata();

  }


  loaddata() {
    this.titleGoalName = "";
    this.isModalOpenchangeGoal = false;
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.datauser = JSON.parse(storedUserData);
      console.log(this.goals);
      this.TitleGoal = this.goals.find((goal: any) => goal.id === this.datauser.goal_id);
      if (this.TitleGoal) {
        this.titleGoalName = this.TitleGoal.name;
        console.log(this.titleGoalName);
      }
      this.isLoadingwieght = false;
      this.current_weight = this.datauser.current_weight;
      this.target_weight = this.datauser.target_weight;
      if (this.datauser.goal_id === 3) {
        if (this.current_weight >= this.target_weight) {
          // this modal for showing alert
          this.alertSuccessMessage = true;

          this.pageCondition1 = true;

        }
      }
      if (this.datauser.goal_id === 1) {
        if (this.current_weight <= this.target_weight) {
          // this modal for showing alert
          this.alertSuccessMessage = true;
          this.pageCondition1 = true;

        }
      }

    }
  }

  hideModal() {
    this.alertSuccessMessage = false;
  }
  lineChartMethod() {
    if (this.lineChart) {
      this.lineChart.destroy(); // Destroy the existing chart instance
    }

    // Retrieve the dates and weights from this.journalDataAll
    const dates = this.journalDatachart.map(entry => entry.created_at.substring(0, 10));
    const weights = this.journalDatachart.map(entry => entry.weight);
    // Map the dates to the corresponding month names
    const labelsdates = dates.map(date => {
      const monthIndex = new Date(date).getMonth();
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return monthNames[monthIndex];
    });
    // Map the dates to the corresponding week numbers
    const labelsweek = dates.map(date => {
      const weekNumber = Math.ceil(new Date(date).getDate() / 7);
      return `Week ${weekNumber}`;
    });


    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labelsweek,
        datasets: [
          {
            label: 'Weight Tracking',

            fill: false,
            tension: 0.1,
            backgroundColor: 'transparent',
            //backgroundColor: 'rgba(50, 0, 74, 1)',
            borderColor: 'white',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'blue',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: weights,
            spanGaps: false,

          }
        ]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: 'white', // Change the text color to weight tracking
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white' // Change x-axis label color to white
            }
          },
          y: {
            ticks: {
              color: 'white' // Change y-axis label color to white
            }
          }
        }
      }

    });


  }

  ngOnInit() {
    this.titleGoalName = "";
    this.reload_userdata();
    this.getProgess();

    // retrive goals from back end for show them in the Form Page
    this.goalService.getGoals().subscribe((response: any) => {
      this.goals = response.data;
    });
  }
  async ionViewWillEnter() {
    this.titleGoalName = "";
    this.reload_userdata();
    await this.getProgess();

  }


  async RegistrationComplete() {

    await this.loadingService.presentLoading(1200);

    if (this.newGoal) {

      // update in database user targetweight
      const userData: userData = {
        target_weight: this.newGoal

      };

      this.formService.formupdate(userData).subscribe(
        async (response: any) => {
          console.log('target_weight:', response);
          if (response.message === "User updated successfully") {
            await this.userDataService.GetData().subscribe((response: GetDataUser) => {
              this.datauser = response.data;
              localStorage.setItem('userData', JSON.stringify(this.datauser));
              this.pageCondition1 = false;
              // Store the user data in local storage
            });
            this.reload_userdata();
            await this.getProgess();
            // this.router.navigate(['/dashboard']);
          } else {
            // Handle  error, display a message, etc.
          }
        },
        (error) => {
          // Handle  error, display a message, etc.
        }
      );


      this.modalController.dismiss();
      this.isModalOpenchangeGoal = false;

      this.router.navigate(['/progress']);
    }
    else {
      alert("enter Your Target Weight")
    }

  }
  setGoal(goalids: number) {
    // Set the value of the Goal form control to the selected goal
    const userData: userData = {
      goal_id: goalids

    };

    this.formService.formupdate(userData).subscribe(
      async (response: any) => {
        console.log('Goal ID:', response);
        if (response.message === "User updated successfully") {
          await this.userDataService.GetData().subscribe((response: GetDataUser) => {
            this.datauser = response.data;
            this.loadingService.presentLoading(1200);
            localStorage.setItem('userData', JSON.stringify(this.datauser));
            this.isModalOpenchangeGoal = true;
            // Store the user data in local storage
          });

          await this.getProgess();
        } else {
          // Handle  error, display a message, etc.
        }
      },
      (error) => {
        // Handle  error, display a message, etc.
      }
    );






  }
}