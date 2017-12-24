import {removeFromArray} from '../utilities/arrayutilities';

import Observer from './observer';

export default class Observable {

	constructor(){
		this.observers = []
	}

	registerObserver(observer){
		this.obsrvers.push(observer);
	}
	
	unregisterObserver(observer){
		removeFromArray(this.observers, observer);
	}

	notifyObservers(){
		for (var observer of observers){
			observer.update(this);
		}
	}

}